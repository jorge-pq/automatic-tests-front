import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Edit, LocalHotel, Delete, Image as ImageIcon } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material'
import { useRouter } from 'next/router';

export default function HotelsTable({ data, showEdit, removeHotel }) {

    const router = useRouter();

    const goToRoomsByHotel = (id) => router.push(`/manage/rooms/${id}`);

    const goToGallery = (id) => router.push(`/manage/gallery/${id}`);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>{'Hotel'}</TableCell>
                        <TableCell align="right">{'Accion'}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">
                            <Tooltip title="Ver Habitaciones">
                                    <IconButton onClick={() => goToGallery(row._id)}>
                                        <ImageIcon />
                                    </IconButton>
                                </Tooltip>
                                
                                <Tooltip title="Ver Habitaciones">
                                    <IconButton onClick={() => goToRoomsByHotel(row._id)}>
                                        <LocalHotel />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Editar">
                                    <IconButton onClick={()=>showEdit(row._id)}>
                                        <Edit />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Eliminar" >
                                    <IconButton onClick={()=>removeHotel(row._id)}>
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
}
