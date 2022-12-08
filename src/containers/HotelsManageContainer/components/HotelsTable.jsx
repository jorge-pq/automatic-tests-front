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
import {getTenant} from '../../../utils/util';
import Chip from '@mui/material/Chip';

export default function HotelsTable({ data, showEdit, removeHotel }) {

    const router = useRouter();

    const goToRoomsByHotel = (id) => router.push(`/${getTenant()}/manage/rooms/${id}`);

    const goToGallery = (id) => router.push(`/${getTenant()}/manage/gallery/${id}`);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>{'Código'}</TableCell>
                        <TableCell>{'Nombre'}</TableCell>
                        <TableCell>{'País'}</TableCell>
                        <TableCell>{'Estado'}</TableCell>
                        <TableCell>{'Ciudad'}</TableCell>
                        <TableCell>{'Dirección'}</TableCell>
                        <TableCell>{'Código postal'}</TableCell>
                        <TableCell>{'Activo'}</TableCell>
                        <TableCell align="center">{'Acción'}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.code}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.country}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.state}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.city}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.address}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.zipCode}
                            </TableCell>
                            <TableCell component="th" scope="row">
                               <Chip label={row.active? 'Activo' : 'Inactivo'} color={row.active ? 'success' : 'error'} />
                            </TableCell>
                            <TableCell align="right">
                            <Tooltip title="Ver Imágenes">
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
