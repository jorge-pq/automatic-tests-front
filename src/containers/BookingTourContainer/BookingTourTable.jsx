import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const BookingTourTable = () => {
    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">{'Fecha'}</TableCell>
                    <TableCell align="center">{'Habitación'}</TableCell>
                    <TableCell align="center">{'Adultos'}</TableCell>
                    <TableCell align="center">{'Niños'}</TableCell>
                    <TableCell align="center">{'Infantes'}</TableCell>
                    <TableCell align="center">{'Total'}</TableCell>
                    <TableCell align="center">{'Eliminar'}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BookingTourTable;