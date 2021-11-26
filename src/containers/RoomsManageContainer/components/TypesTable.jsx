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

export default function TypesTable({data, removeType}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">{'Tipo'}</TableCell>
            <TableCell align="center">{'Precio standard'}</TableCell>
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
              <TableCell align="center"scope="row">
                {row.description}
              </TableCell>
              <TableCell align="center" scope="row">
                {row.price}
              </TableCell>
              <TableCell align="left"><OffersChip data={row.offers} /></TableCell>
              <TableCell align="center">
                <IconButton onClick={()=>removeType(row.description)}>
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
