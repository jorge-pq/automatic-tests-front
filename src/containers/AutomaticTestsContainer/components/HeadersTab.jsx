import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


const HeadersTab = ({ headers, addRowToHeaders, removeRowToHeaders, handleHeaders }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Llave</TableCell>
                        <TableCell align="center">Valor</TableCell>
                        <TableCell align="center">Descripción</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        headers.map((item, index) =>
                            <TableRow key={index}>
                                <TableCell align="center">
                                    <TextField size='small' value={item.key} onChange={e => handleHeaders(index, 'key', e.target.value)} />
                                </TableCell>
                                <TableCell align="center">
                                    <TextField size='small' value={item.value} onChange={e => handleHeaders(index, 'value', e.target.value)} />
                                </TableCell>
                                <TableCell align="center">
                                    <TextField size='small' value={item.description} onChange={e => handleHeaders(index, 'description', e.target.value)} />
                                </TableCell>
                                <TableCell align="center">
                                    {
                                        headers.length - 1 > index &&
                                        <IconButton color="error" component="label" onClick={() => removeRowToHeaders(index)}>
                                            <RemoveCircleOutlineIcon />
                                        </IconButton>
                                    }
                                    {
                                        headers.length - 1 === index &&
                                        <IconButton color="primary" component="label" onClick={addRowToHeaders}>
                                            <AddCircleOutlineIcon />
                                        </IconButton>
                                    }
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default HeadersTab;