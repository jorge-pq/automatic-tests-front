import React from 'react';
import { Grid, Paper, Typography, Divider, Button, Stack } from '@mui/material';


const OrderDetailsContainer = ({ order }) => {

    const getTotalPrice = () => {
        return parseFloat(order.order.reduce((a, c) => (a + c.total + c.childrenTotal), 0)).toFixed(2);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={9}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Grid container justifyContent={'space-between'}>
                        <Grid item>
                            <Typography><b>{'No. Reserva: '}</b>{order.code}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography><b>{'Fecha: '}</b>{new Date(order.creationDate).toLocaleDateString()}</Typography>
                        </Grid>
                        <Grid item xs={12} mt={3} mb={1}>
                            <Typography variant='h6'>{'Datos de la oficina'}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography><b>{'Dirección: '}</b>{'2742 SW 8th St'}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography><b>{'Teléfono: '}</b>{'786 452 7815'}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography><b>{'Empleado: '}</b>{'Melina Labrada'}</Typography>
                        </Grid>
                        <Divider />
                        <Grid item xs={12} mt={3} mb={1}>
                            <Typography variant='h6'>{'Datos del cliente'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><b>{'Nombre: '}</b>{`${order.client.name} ${order.client.secondname || ''} ${order.client.lastname} ${order.client.secondlastname || ''}`}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><b>{'País: '}</b>{'Estados Unidos'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><b>{'Teléfono: '}</b>{order.client.phone}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><b>{'Estado: '}</b>{order.client.state}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><b>{'Correo: '}</b>{order.client.email}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><b>{'Ciudad: '}</b>{order.client.city}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><b>{'Fecha de nacimiento: '}</b>{'1990/09/30'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><b>{'Dirección: '}</b>{order.client.address}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><b>{'ID: '}</b>{order.client.clientID}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><b>{'Código postal: '}</b>{order.client.zipcode}</Typography>
                        </Grid>

                        <Divider sx={{ width: '100%', my: 2 }} />
                        <Grid item xs={12} mb={1}>
                            <Typography variant='h6'>{'Datos de la reserva'}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography><b>{'Hotel: '}</b>{order.hotel.name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography><b>{'Fecha entrada: '}</b>{new Date(order.order[0].date[0]).toLocaleDateString()}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography><b>{'Fecha salida: '}</b>{new Date(order.order[0].date[1]).toLocaleDateString()}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography><b>{'Habitaciones: '}</b></Typography>
                        </Grid>

                        {
                            order.order.map((i, index) =>
                                <Grid container key={index}>
                                    <Grid item xs={6} mt={1}>
                                        <Typography><b>- {i.room.name}</b></Typography>
                                    </Grid>
                                    <Grid item xs={6} mt={1}>
                                        <Typography><b>{'Tipo: '}</b>{i.type}</Typography>
                                        <Typography><b>{'Adultos: '}</b>{i.adults}</Typography>
                                        <Typography><b>{'Niños: '}</b>{i.childrensCount}</Typography>
                                    </Grid>
                                </Grid>
                            )
                        }

                        <Divider sx={{ width: '100%', my: 2 }} />
                        <Grid item xs={12}>
                            <Typography variant='h6'>{'Datos de Huéspedes'}</Typography>
                        </Grid>

                        {
                            order.guests.map((i, index) =>
                                <Grid container key={index}>
                                    <Grid item xs={6} mt={1}>
                                        <Typography><b>{'- Huésped ' + parseInt(index + 1)}</b></Typography>
                                    </Grid>
                                    <Grid item xs={6} mt={1}>
                                        <Typography><b>{'Nombre: '}</b>{i.name}</Typography>
                                        <Typography><b>{'Apellidps: '}</b>{i.lastname}</Typography>
                                        <Typography><b>{'Pasaporte: '}</b>{i.passport}</Typography>
                                    </Grid>
                                </Grid>
                            )
                        }

                        <Divider sx={{ width: '100%', my: 2 }} />
                        <Grid item xs={12}>
                            <Typography variant='h6'>{'Datos del pago'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{'Tipo:'}</Typography>
                        </Grid>
                        <Grid item xs={6} textAlign={'right'}>
                            <Typography><b>{'Cash'}</b></Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{'Servicio: '}</Typography>
                        </Grid>
                        <Grid item xs={6} textAlign={'right'}>
                            <Typography><b>${1}</b></Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{'Descuento:'}</Typography>
                        </Grid>
                        <Grid item xs={6} textAlign={'right'}>
                            <Typography><b>${0}</b></Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{'Total:'}</Typography>
                        </Grid>
                        <Grid item xs={6} textAlign={'right'}>
                            <Typography><b>${getTotalPrice()}</b></Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{'Balance:'}</Typography>
                        </Grid>
                        <Grid item xs={6} textAlign={'right'}>
                            <Typography><b>${0}</b></Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid >
            <Grid item xs={3}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Stack direction={'column'} spacing={2}>
                    <Button variant='contained' size='small'>
                        {'Enviar por correo'}
                    </Button>
                    <Button variant='contained' size='small'>
                        {'Exportar PDF'}
                    </Button>
                    <Button variant='contained' size='small'>
                        {'Comprobante de pago'}
                    </Button>
                  </Stack>
                </Paper>
            </Grid>
        </Grid >
    );
};

export default OrderDetailsContainer;