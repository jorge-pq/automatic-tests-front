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

const RoomsTable = ({data, showEdit, removeRoom}) => {
    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>{'Habitacion'}</TableCell>
                    <TableCell align="right">{'Accion'}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row, index) => (
                    <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">
                            <Tooltip title="Editar">
                                <IconButton onClick={()=>showEdit(row.name)}>
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Eliminar">
                                <IconButton onClick={()=>removeRoom(row.name)}>
                                    <Delete />
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

export default RoomsTable;