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

const ParamsTab = ({ params, addRowToParams, removeRowToParams, handleParam }) => {
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
                        params.map((item, index) =>
                            <TableRow key={index}>
                                <TableCell align="center">
                                    <TextField size='small' value={item.key} onChange={e=>handleParam(index, 'key', e.target.value)} />
                                </TableCell>
                                <TableCell align="center">
                                    <TextField size='small' value={item.value} onChange={e=>handleParam(index, 'value', e.target.value)} />
                                </TableCell>
                                <TableCell align="center">
                                    <TextField size='small' value={item.description} onChange={e=>handleParam(index, 'description', e.target.value)} />
                                </TableCell>
                                <TableCell align="center">
                                    {
                                        params.length - 1 > index &&
                                        <IconButton color="error" component="label" onClick={()=>removeRowToParams(index)}>
                                            <RemoveCircleOutlineIcon />
                                        </IconButton>
                                    }
                                    {
                                        params.length - 1 === index &&
                                        <IconButton color="primary" component="label" onClick={addRowToParams}>
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

export default ParamsTab;