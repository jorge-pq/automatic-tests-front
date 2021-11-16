import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';


function createRow(desc, qty, unit) {
    const price = 2100;
    return { desc, qty, unit, price };
}


const rows = [
    createRow('Luxury', [{ key: 'Sencilla', value: 1 }, { key: 'Doble', value: 1 }], 0),
];


export default function BookingTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">{'Habitación'}</TableCell>
                        <TableCell align="left">{'Cantidad'}</TableCell>
                        <TableCell align="center">{'Niños'}</TableCell>
                        <TableCell align="center">{'Total'}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.desc} align="center">
                            <TableCell align="center">{row.desc}</TableCell>
                            <TableCell align="left">
                                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>

                                    {
                                        row.qty.map(item =>
                                            <ListItem component="div" disablePadding>
                                                <ListItemButton>
                                                    <ListItemText primary={`${item.key}: ${item.value}`} />
                                                </ListItemButton>
                                            </ListItem>
                                        )
                                    }
                                </List>
                            </TableCell>
                            <TableCell align="center">{row.unit}</TableCell>
                            <TableCell align="center">{row.price}</TableCell>
                        </TableRow>
                    ))}

                    <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell align="right">{2100}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Costos</TableCell>
                        <TableCell align="right">{1100}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="right">{2500}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
