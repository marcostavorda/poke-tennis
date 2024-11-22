import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const paginationModel = { page: 0, pageSize: 5 }

export default function MatchResult({columns, rows}) {
  return (
    <Paper sx={{ height: 300, width: '30%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}