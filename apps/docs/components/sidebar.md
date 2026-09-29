# Sidebar

<script setup>
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@jaltech/vuejs-ui/sidebar'
</script>

A composable application sidebar with headers, groups, and menus. Wrap your app in `SidebarProvider` so descendants can read and toggle the sidebar state.

<ClientOnly>
<div class="demo" style="height:280px;overflow:hidden">
  <SidebarProvider class="min-h-0" style="min-height:0;height:100%">
    <Sidebar collapsible="none">
      <SidebarHeader style="padding:.75rem;font-weight:600;font-size:14px">Acme Inc</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>Dashboard</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>Projects</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>Settings</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter style="padding:.75rem;font-size:13px;color:hsl(var(--muted-foreground))">v1.0.0</SidebarFooter>
    </Sidebar>
  </SidebarProvider>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@jaltech/vuejs-ui/sidebar'
</script>

<template>
  <SidebarProvider>
    <Sidebar collapsible="none">
      <SidebarHeader>Acme Inc</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>Dashboard</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>Projects</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>Settings</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>v1.0.0</SidebarFooter>
    </Sidebar>
  </SidebarProvider>
</template>
```
