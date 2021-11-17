import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Typography, IconButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function BookingTable({ data, remove}) {

    const getTotal = () => {
        return data.reduce((a, c) => (a + c.total), 0);
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">{'Habitación'}</TableCell>
                        <TableCell align="left">{'Cantidad'}</TableCell>
                        <TableCell align="center">{'Niños'}</TableCell>
                        <TableCell align="center">{'Total'}</TableCell>
                        <TableCell align="center">{'Eliminar'}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index} align="center">
                            <TableCell align="center">{row.room.name}</TableCell>
                            <TableCell align="left">
                                <Stack direction="row" spacing={1}>
                                    {Object.keys(row.types).map((item, index) =>
                                        row.types[item] > 0 && <Chip key={index} label={`${item}: ${row.types[item]}`} color="primary" />
                                    )}
                                </Stack>
                            </TableCell>
                            <TableCell align="center">{row.childrens || '-'}</TableCell>
                            <TableCell align="center">${row.total}</TableCell>
                            <TableCell align="center">
                                <IconButton onClick={()=>remove(row.room.name)}>
                                    <HighlightOffIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}

                    <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell align="center">${getTotal()}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Costos</TableCell>
                        <TableCell align="center">{0}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="center"><Typography variant={'h5'}>${getTotal()}</Typography></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
