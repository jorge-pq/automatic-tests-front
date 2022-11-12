import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, Tooltip } from '@mui/material'
import AssignmentIcon from '@mui/icons-material/Assignment';
import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';
import { useRouter } from 'next/router';
import {getTenant} from '../../utils/util';

function getColorStatus(state){
    let color = 'default'
    switch (state) {
        case 'Pendiente':
            color = 'info'
            break;
        case 'Confirmado':
            color = 'success'
            break;
        case 'Cancelado':
            color = 'error'
            break;
        default:
            break;
    }
    return color;
}

const OrdersContainer = ({bookings}) => {

    const router = useRouter();

    const getBookingDate = (range) => {
        return new Date(range[0]).toLocaleDateString() + ' - ' + new Date(range[1]).toLocaleDateString();
    }

    const details = id => {
        router.push(`/${getTenant()}/order/${id}`)
    }

    const changeState = id => {

    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">{'Código'}</TableCell>
                        <TableCell align="center">{'Agencia'}</TableCell>
                        <TableCell align="center">{'Hotel'}</TableCell>
                        <TableCell align="center">{'Cliente'}</TableCell>
                        <TableCell align="center">{'Fecha reservación'}</TableCell>
                        <TableCell align="center">{'Fecha creación'}</TableCell>
                        <TableCell align="center">{'Estado'}</TableCell>
                        <TableCell align="center">{'Acción'}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bookings.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" align="center">
                                {row.code}
                            </TableCell>
                            <TableCell component="th" scope="row" align="center">
                                <Chip label={row.tenant.name} color={'default'} title={row.tenant.type} />
                            </TableCell>
                            <TableCell component="th" scope="row" align="center">
                                {row.hotel.name}
                            </TableCell>
                            <TableCell component="th" scope="row" align="center">
                                {`${row.client.name} ${row.client.lastname}`}
                            </TableCell>
                            <TableCell component="th" scope="row" align="center">
                                {getBookingDate(row.order[0].date)}
                            </TableCell>
                            <TableCell component="th" scope="row" align="center">
                                {new Date(row.creationDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell component="th" scope="row" align="center">
                               <Chip label={row.state} color={getColorStatus(row.state)}/>
                            </TableCell>
                            <TableCell align="center">
                                <Tooltip title="DETALLES">
                                    <IconButton onClick={()=>details(row._id)}>
                                        <AssignmentIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="CAMBIAR ESTADO">
                                    <IconButton onClick={()=>changeState(row._id)}>
                                        <EditIcon />
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

export default OrdersContainer;