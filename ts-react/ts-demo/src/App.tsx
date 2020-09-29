import React from 'react';
import DataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' }
];

const rows = [
  { id: 0, title: 'Example' },
  { id: 1, title: 'Demo' }
];

function App() {

  for(let i = 2; i < 10000; i++) {
    rows.push({ id: 2, title: 'wwwwwwwwwwwwwwwwwwww' })
  }

  return (
    <div className="App" style={{height: 100}}>
      <DataGrid
        columns={columns}
        rows={rows}
        rowsCount={3}
      />
    </div>
  );
}

export default App;
