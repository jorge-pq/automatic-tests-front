import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, Tooltip } from '@mui/material'
import AssignmentIcon from '@mui/icons-material/Assignment';


const OrdersContainer = ({bookings}) => {

    const getBookingDate = (range) => {
        return new Date(range[0]).toLocaleDateString() + ' - ' + new Date(range[1]).toLocaleDateString();
    }

    const details = id => {

    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>{'Código'}</TableCell>
                        <TableCell>{'Hotel'}</TableCell>
                        <TableCell>{'Cliente'}</TableCell>
                        <TableCell>{'Fecha reservación'}</TableCell>
                        <TableCell>{'Fecha reación'}</TableCell>
                        <TableCell align="right">{'Accion'}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bookings.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.code}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.hotel.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {`${row.client.name} ${row.client.lastname}`}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {getBookingDate(row.order[0].date)}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {new Date(row.creationDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell align="right">
                                <Tooltip title="DETALLES">
                                    <IconButton onClick={()=>details(row._id)}>
                                        <AssignmentIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrdersContainer;