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
import { Typography, IconButton, Autocomplete, TextField } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { format } from 'date-fns'

export default function BookingTable({ data, remove, handleChildren}) {

    const getTotal = () => {
        return parseFloat(data.reduce((a, c) => (a + c.total + c.childrenTotal), 0)).toFixed(2);
    }
    const getTotalAdults = () => {
        return data.reduce((a, c) => (a + c.adults), 0);
    }
    
    const getTotalChildrens = () => {
        return data.reduce((a, c) => (a + c.childrensCount), 0);
    }
    

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">{'Fecha'}</TableCell>
                        <TableCell align="center">{'Habitación'}</TableCell>
                        <TableCell align="center">{'Tipo'}</TableCell>
                        <TableCell align="center">{'Adultos'}</TableCell>
                        <TableCell align="center">{'Niños'}</TableCell>
                        <TableCell align="center">{'Total'}</TableCell>
                        <TableCell align="center">{'Eliminar'}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index} align="center">
                            <TableCell align="center">{format(row.date[0]._d, 'dd/MM/yyyy')} - {format(row.date[1]._d, 'dd/MM/yyyy')}</TableCell>
                            <TableCell align="center">{row.room.name}</TableCell>
                            {/* <TableCell align="left">
                                <Stack direction="row" spacing={1}>
                                    {Object.keys(row.types).map((item, index) =>
                                        row.types[item] > 0 && <Chip key={index} label={`${item}: ${row.types[item]}`} color="primary" />
                                    )}
                                </Stack>
                            </TableCell> */}
                            <TableCell align="center">{row.type}</TableCell>
                            <TableCell align="center">{row.adults}</TableCell>
                            <TableCell align="center" width={'130px'}>
                                <Autocomplete
                                    sx={{ mt: 2 }}
                                    disablePortal
                                    fullWidth
                                    id="combo-box-demo"
                                    options={row.childrens}
                                    size={'small'}
                                    onChange={(event, op) => {
                                        handleChildren(row.room.name, op?.count, index);
                                    }}
                                    getOptionLabel={(option) => String(option.count)}
                                    renderInput={(params) => <TextField fullWidth {...params} label={'Niños'} />}
                                />
                            </TableCell>
                            <TableCell align="center">${parseFloat(row.total + row.childrenTotal).toFixed(2)}</TableCell>
                            <TableCell align="center">
                                <IconButton onClick={()=>remove(index)}>
                                    <HighlightOffIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}

                    {/* <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={3}>Subtotal</TableCell>
                        <TableCell align="center">${getTotal()}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Costos</TableCell>
                        <TableCell align="center">{0}</TableCell>
                    </TableRow> */}
                    <TableRow>
                        <TableCell rowSpan={1} />
                        <TableCell colSpan={2}><strong>{'TOTAL'}</strong></TableCell>
                        <TableCell align="center"><Typography variant={'h5'}>{getTotalAdults()}</Typography></TableCell>
                        <TableCell align="center"><Typography variant={'h5'}>{getTotalChildrens()}</Typography></TableCell>
                        <TableCell align="center"><Typography variant={'h5'}>${getTotal()}</Typography></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
