import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper, TablePagination } from '@mui/material';
import { FaPlus } from "react-icons/fa6";
import Switch from '@mui/material/Switch';
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from 'react-icons/fa';
import Entry from './Entry';

const Ptable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showEntry, setShowEntry] = useState(false);
  const handleAddItemClick = () => {
    setShowEntry(true); // Show the Entry form when "Add Item" is clicked
};
  const closeadditemclick = () => {
    setShowEntry(false); // Show the Entry form when "Add Item" is clicked
};

  // Sample data
  const rows = [
    { id: 1, billNumber: '123', item: 'Item 1', category: 'Category 1', type: 'Type 1', qty: 10, unitCost: 100, vendor: 'Vendor A', expDate: '2024-12-25' },
    { id: 2, billNumber: '124', item: 'Item 2', category: 'Category 2', type: 'Type 2', qty: 20, unitCost: 150, vendor: 'Vendor B', expDate: '2024-12-26' },
    { id: 3, billNumber: '125', item: 'Item 3', category: 'Category 3', type: 'Type 3', qty: 30, unitCost: 200, vendor: 'Vendor C', expDate: '2024-12-27' },
    { id: 4, billNumber: '126', item: 'Item 4', category: 'Category 4', type: 'Type 4', qty: 40, unitCost: 250, vendor: 'Vendor D', expDate: '2024-12-28' },
    { id: 5, billNumber: '127', item: 'Item 5', category: 'Category 5', type: 'Type 5', qty: 50, unitCost: 300, vendor: 'Vendor E', expDate: '2024-12-29' },
    { id: 6, billNumber: '128', item: 'Item 6', category: 'Category 6', type: 'Type 6', qty: 60, unitCost: 350, vendor: 'Vendor F', expDate: '2024-12-30' },
    { id: 7, billNumber: '129', item: 'Item 7', category: 'Category 7', type: 'Type 7', qty: 70, unitCost: 400, vendor: 'Vendor G', expDate: '2024-12-31' },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="w-full h-full mt-10">
      <div className='bg-[#f3faf9] rounded-2xl border pt-20 relative overflow-hidden'>
  <div className='w-full h-[5rem] bg-[#f3faf9] absolute inset-0'>
    <div className='flex flex-col md:flex-row justify-between px-4 items-center w-full h-full'>
      <div className='flex-1'>
        <h1 className='text-[#51B0AA] font-bold text-center md:text-left'>
          Stock Threshold
        </h1>
      </div>
      <div className='flex md:flex-row items-center gap-4 mt-4 md:mt-0 md:pb-0 pb-2'>
        <button onClick={handleAddItemClick} className='bg-[#51B0AA] text-white px-2 py-1  md:px-4 md:py-2 rounded-lg flex items-center gap-2'>
          <FaPlus />
          Add Threshold
        </button>
        <Switch color="default" defaultChecked />
      </div>
    </div>
</div>
        <TableContainer component={Paper} className="w-full">
          <Table aria-label="purchase table">
            <TableHead className='bg-[#D6F1ED] h-[5rem] rounded-t-lg'>
              <TableRow className="text-[#73798F]">
                <TableCell padding="checkbox">
                  <Checkbox color="primary" />
                </TableCell>
                <TableCell align="left">#</TableCell>
                <TableCell align="center">Item</TableCell>
                <TableCell align="center">Threshold</TableCell>
                <TableCell align="center">Restocking Interval</TableCell>
                <TableCell align="right" className='md:pr-10'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow className='h-[5rem] ' key={row.id}>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell align="left">{row.id}</TableCell>
                  <TableCell align="center">{row.billNumber}</TableCell>
                  <TableCell align="center">{row.item}</TableCell>
                  <TableCell align="center">{row.category}</TableCell>
                  <TableCell align="right" >
                    <div className="flex w-full items-center justify-end gap-4">
                      <Switch color="default" defaultChecked />
                      <FaRegEdit className="text-lg" />
                      <RiDeleteBin5Line className='text-lg' />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>


      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {showEntry && <Entry closeadditemclick={closeadditemclick} />}
    </div>
  );
};

export default Ptable;
