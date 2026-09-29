# Deploying the showcase — vuejs-ui.profeskills.com

The showcase is a static VitePress build served on the platform VM by a small
`nginx:alpine` container (`vuejs-ui-docs`) behind the shared nginx reverse proxy.
DNS is covered by the `*.profeskills.com` wildcard; TLS is a per-domain Let's
Encrypt certificate.

This is **not yet wired into CI** — updates are pushed manually from a machine
that has AWS access to the platform account (account `687407229979`, region
`eu-west-1`, instance `i-01bc5fd8cf3940254`).

## Update the site (after changing docs/components)

```bash
# 1. Build
cd docs && pnpm build

# 2. Upload the static output to S3 (transfer channel to the VM)
aws s3 sync .vitepress/dist \
  s3://platform-prod-backups-687407229979/vuejs-ui-docs/site/ \
  --region eu-west-1 --delete

# 3. On the VM (via SSM AWS-RunShellScript), pull it into the served volume:
#    aws s3 sync s3://platform-prod-backups-687407229979/vuejs-ui-docs/site/ \
#      /opt/vuejs-ui-docs/site --region eu-west-1 --delete --exact-timestamps
```

> **Always pass `--exact-timestamps` on the VM pull (step 3).** Without it,
> `aws s3 sync` (S3 → local) skips a re-uploaded file whose local copy is the
> same size and not older — which happens to `index.html` across VitePress
> rebuilds. The result is a **stale `index.html` referencing a hashed
> `style.<hash>.css` that no longer exists → the whole site loads unstyled
> (CSS 404)** while the assets themselves are up to date. `--exact-timestamps`
> forces the HTML to refresh so it matches the deployed assets.

No container restart is needed for a content update — the site directory is a
read-only bind mount, so the new files are served immediately.

## First-time setup (already done)

- **Static container** on `platform-net`:
  ```bash
  docker run -d --name vuejs-ui-docs --restart unless-stopped --network platform-net \
    -v /opt/vuejs-ui-docs/site:/usr/share/nginx/html:ro \
    -v /opt/vuejs-ui-docs/default.conf:/etc/nginx/conf.d/default.conf:ro \
    nginx:1.27-alpine
  ```
  where `/opt/vuejs-ui-docs/default.conf` serves clean URLs:
  ```nginx
  server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;
    location / { try_files $uri $uri.html $uri/ =404; }
  }
  ```
- **Reverse-proxy vhost**: `conf.d/vuejs-ui.conf` in the `nginx` repo.
- **TLS**: `certbot certonly --webroot -w /var/www/certbot -d vuejs-ui.profeskills.com`
  (auto-renewed by the existing certbot cron).

## Possible follow-up

Wire steps 1–3 into a GitHub Actions workflow (build + S3 sync + SSM pull) so a
push to `main` refreshes the live site, mirroring the projectflow deploy pattern.
