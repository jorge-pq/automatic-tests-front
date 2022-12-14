import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Edit, Delete } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material'
import { format } from 'date-fns'


const TourDetailsTable = ({ data, showEdit, removeRoom }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">{'Oferta'}</TableCell>
                        <TableCell align="left">{'Disponibilidad'}</TableCell>
                        <TableCell align="left">{'Precio'}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                            {`${row.isPeriod ? (format(new Date(row.period[0]), 'dd/MM/yyyy') + ' - ' + format(new Date(row.period[1]), 'dd/MM/yyyy')) : format(new Date(row.date), 'dd/MM/yyyy')} `}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.availability}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <ul>
                                    {
                                        row.offers.map((item, i) =>
                                            <li key={i}>
                                                {item.room}
                                                <ul>
                                                    <li>Costo adultos: <b>${item.costAdult}</b> - Precio publico de adultos: <b>${item.priceAdult}</b> - Precio minorista de adultos: <b>${item.priceRetailAdult}</b></li>
                                                    <li>Costo niños: <b>${item.costChildren}</b> -  Precio publico de niños: <b>${item.priceChildren}</b> - Precio minorista de niños: <b>${item.priceRetailChildren}</b></li>
                                                    <li>Costo infantes: <b>${item.costInfant}</b> -  Precio publico de infantes: <b>${item.priceInfant}</b> - Precio minorista de infantes: <b>${item.priceRetailInfant}</b></li>
                                                </ul>
                                            </li>
                                        )
                                    }
                                </ul>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TourDetailsTable;