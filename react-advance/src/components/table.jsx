import React, { useState } from 'react'
import DataGrid from "react-data-grid";
import 'react-data-grid/dist/react-data-grid.css';

const columns = [
  { key: "id", name: "ID" },
  { key: "title", name: "Title" },
  { key: "complete", name: "Complete" }
];

const rows = [
  { id: 0, title: "Task 1", complete: 20 },
  { id: 1, title: "Task 2", complete: 40 },
  { id: 2, title: "Task 3", complete: 60 }
];

const Table = (props) => {

  return (
    <DataGrid
      columns={columns}
      rows={rows}
    />
  )
}

export default Table