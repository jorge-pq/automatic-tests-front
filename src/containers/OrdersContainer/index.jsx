import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { IconButton, Tooltip, Autocomplete } from '@mui/material'
import AssignmentIcon from '@mui/icons-material/Assignment';
import EditIcon from '@mui/icons-material/Edit';
import UpdateIcon from '@mui/icons-material/Update';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';
import { getTenant } from '../../utils/util';
import { updateBooking } from '../../services/booking.service';
import { useMutation } from 'react-query';
import OrderEditDialog from './OrderEditComponents/OrderEditDialog'
import TextField from '@mui/material/TextField';

function getColorStatus(state) {
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

const options = [
    'Pendiente',
    'Confirmado',
    'Cancelado'
];

const ITEM_HEIGHT = 48;

const OrdersContainer = ({ bookings }) => {

    const router = useRouter();
    const [selected, setSelected] = useState();
    const [id, setid] = useState();
    const [showEditDialog, setShowEditDialog] = useState();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [filter, setFilter] = useState({
        state: ''
    });
    
    const handleFilter = value => {
        setFilter({...filter, state: value});
    }

    const { mutate: save } = useMutation(updateBooking, {
        onSuccess: (data) => {
            router.reload();
        },
        onError: (error) => {
            alert('Error! ');
        }
    });

    const getBookingDate = (range) => {
        return new Date(range[0]).toLocaleDateString() + ' - ' + new Date(range[1]).toLocaleDateString();
    }

    const details = id => {
        router.push(`/${getTenant()}/order/${id}`)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeState = (id, option) => {
        save({ id: id, values: { state: option } })
    }

    const handleEdit = (id) => {
        let b = bookings.find(d => d._id === id);
        setSelected(b);
        setid(b._id);
        setShowEditDialog(true);
    }

    const getTotalPersons = () => {
        let persons = selected.order.reduce((a, c) => (a + c.adults), 0);
        let childrens = selected.order.reduce((a, c) => (a + c.childrensCount), 0);
        let infants = selected.order.reduce((a, c) => (a + (c.infantCount || 0)), 0);
        return persons + childrens + infants;
    }

    const getTotalPrice = () => {
        return parseFloat(selected.order.reduce((a, c) => (a + c.total + c.childrenTotal + (c.infantTotal || 0)), 0)).toFixed(2);
    }


    const edit = (data) => {
        selected.client = data.client;
        selected.guests = data.guests;
        selected.pay = data.pay;
        save({ id: selected._id, values: selected })
    }

    const filtered = item => {
        return filter.state ? item.state === filter.state : (item.state === options[0] || item.state === options[1]) 
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant={'h6'}>{'Lista de ordenes'}</Typography>
            </Grid>
            <Grid item xs={3} my={3}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    size={'small'}
                    value={filter.state}
                    onChange={(event, value) => {
                        handleFilter(value);
                    }}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => <TextField fullWidth {...params} label="Estado" />}
                />
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 300 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">{'Código'}</TableCell>
                                <TableCell align="center">{'Agencia'}</TableCell>
                                <TableCell align="center">{'Hotel / Tour'}</TableCell>
                                <TableCell align="center">{'Cliente'}</TableCell>
                                <TableCell align="center">{'Fecha reservación'}</TableCell>
                                <TableCell align="center">{'Fecha creación'}</TableCell>
                                <TableCell align="center">{'Estado'}</TableCell>
                                <TableCell align="center">{'Acción'}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.filter(filtered).map((row) => (
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
                                        {row.type === "hotel" || !row.type ? getBookingDate(row.order[0].date) : row.order[0].period}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {new Date(row.creationDate).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        <Chip label={row.state} color={getColorStatus(row.state)} />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="DETALLES">
                                            <IconButton onClick={() => details(row._id)}>
                                                <AssignmentIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="CAMBIAR ESTADO">
                                            <IconButton onClick={handleClick}>
                                                <UpdateIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="EDITAR ORDEN">
                                            <IconButton onClick={() => handleEdit(row._id)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            id="long-menu"
                                            MenuListProps={{
                                                'aria-labelledby': 'long-button',
                                            }}
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            PaperProps={{
                                                style: {
                                                    maxHeight: ITEM_HEIGHT * 4.5,
                                                    width: '20ch',
                                                },
                                            }}
                                        >
                                            {options.map((option) => (
                                                <MenuItem key={option} onClick={() => changeState(row._id, option)}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {selected &&
                    <OrderEditDialog
                        id={id}
                        open={showEditDialog}
                        booking={selected}
                        close={() => setShowEditDialog(false)}
                        save={edit}
                        totalGuests={getTotalPersons()}
                        totalPrice={getTotalPrice()}
                    />}
            </Grid>
        </Grid>
    );
};

export default OrdersContainer;