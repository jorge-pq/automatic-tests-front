import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import OffersChip from './OffersChip';
import { format } from 'date-fns'


export default function TypesTable({data, removeType, removeTypeOfferAdded, editOffersToType}) {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">{'Oferta'}</TableCell>
            <TableCell align="left">{'Tipo'}</TableCell>
            <TableCell align="center">{'Accion'}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? data.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center"scope="row">
              {`${ row.isPeriod ? (format(new Date(row.period[0]), 'dd/MM/yyyy') + ' - ' + format(new Date(row.period[1]), 'dd/MM/yyyy')):format(new Date(row.date), 'dd/MM/yyyy') } `} 
              </TableCell>
              <TableCell align="left">
                <OffersChip data={row.offers} handleDeleteOffer={(item)=>removeTypeOfferAdded(item, row.description)} />
              </TableCell>
              <TableCell align="center">
              {/* <IconButton onClick={()=>editOffersToType(row.description)}>
                    <LibraryAddIcon />
                </IconButton> */}
                <IconButton onClick={()=>removeType(index)}>
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
