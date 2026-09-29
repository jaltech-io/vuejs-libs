# Table

<script setup>
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from '@jaltech/vuejs-ui/table'
</script>

A structured data table with header, body, and caption sections.

<div class="demo" style="display:block">
  <Table>
    <TableCaption>Recent invoices</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Invoice</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>INV-001</TableCell>
        <TableCell>Paid</TableCell>
        <TableCell>$250.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>INV-002</TableCell>
        <TableCell>Pending</TableCell>
        <TableCell>$150.00</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>

## Code

```vue
<script setup lang="ts">
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from '@jaltech/vuejs-ui/table'
</script>

<template>
  <Table>
    <TableCaption>Recent invoices</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Invoice</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>INV-001</TableCell>
        <TableCell>Paid</TableCell>
        <TableCell>$250.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>INV-002</TableCell>
        <TableCell>Pending</TableCell>
        <TableCell>$150.00</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
```
