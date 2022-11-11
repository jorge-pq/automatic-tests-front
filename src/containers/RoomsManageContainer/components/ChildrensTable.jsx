import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import OffersChip from './OffersChip';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

export default function ChildrensTable({data, removeChildren, editOffersToChildren}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">{'Cant. niño'}</TableCell>
            {/* <TableCell align="center">{'Precio standard'}</TableCell> */}
            <TableCell align="left">{'Ofertas'}</TableCell>
            <TableCell align="center">{'Eliminar'}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? data.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" scope="row">
                {row.count}
              </TableCell>
              {/* <TableCell align="center">{row.price}</TableCell> */}
              <TableCell align="left">
                <OffersChip data={row.offers} />
              </TableCell>
              <TableCell align="center">
              <IconButton onClick={()=>editOffersToChildren(row.count)}>
                    <LibraryAddIcon />
                </IconButton>
                <IconButton onClick={()=>removeChildren(row.count)}>
                    <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          )):<p style={{marginLeft: '10px'}}>{'0 elementos'}</p>}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
