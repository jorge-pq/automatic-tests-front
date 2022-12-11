import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, IconButton, Autocomplete, TextField } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


const selector = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const BookingTourTable = ({ data, remove, handleChildren, handleInfante }) => {
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
                    {data.map((row, index) => (
                        <TableRow key={index} align="center">
                            <TableCell align="center">{row.period}</TableCell>
                            <TableCell align="center">{row.type}</TableCell>
                            <TableCell align="center">{row.adults}</TableCell>
                            <TableCell align="center" width={'130px'}>
                                <Autocomplete
                                    sx={{ mt: 2 }}
                                    disablePortal
                                    fullWidth
                                    id="combo-box-demo"
                                    options={selector}
                                    size={'small'}
                                    onChange={(event, op) => {
                                        handleChildren(row.type, op, index);
                                    }}
                                    getOptionLabel={(option) => String(option)}
                                    renderInput={(params) => <TextField fullWidth {...params} label={'Niños'} />}
                                />
                            </TableCell>
                            <TableCell align="center" width={'140px'}>
                                <Autocomplete
                                    sx={{ mt: 2 }}
                                    disablePortal
                                    fullWidth
                                    id="combo-box-demo"
                                    options={selector}
                                    size={'small'}
                                    onChange={(event, op) => {
                                        handleInfante(row.type, op, index);
                                    }}
                                    getOptionLabel={(option) => String(option)}
                                    renderInput={(params) => <TextField fullWidth {...params} label={'Infantes'} />}
                                />
                            </TableCell>
                            <TableCell align="center">${parseFloat(row.total + row.childrenTotal + row.infantTotal).toFixed(2)}</TableCell>
                            <TableCell align="center">
                                <IconButton onClick={() => remove(index)}>
                                    <HighlightOffIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell rowSpan={1} />
                        <TableCell colSpan={2}><strong>{'TOTAL'}</strong></TableCell>
                        <TableCell align="center"><Typography variant={'h5'}>{0}</Typography></TableCell>
                        <TableCell align="center"><Typography variant={'h5'}>{0}</Typography></TableCell>
                        <TableCell align="center"><Typography variant={'h5'}>${0}</Typography></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BookingTourTable;