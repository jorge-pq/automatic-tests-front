import React, { useState, useContext, useEffect } from 'react';
import { Grid, Typography, Divider, Button, Autocomplete, TextField } from '@mui/material';
import BookingTourTable from './BookingTourTable';
import { format } from 'date-fns'
import AuthContext from '../../providers/AuthContext';
import CreateBooking from '../BookingContainer/components/CreateBooking';
import { addBooking } from '../../services/booking.service';
import {getAvailability}  from '../../services/tours.service';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import {getTenant} from '../../utils/util';

function getDate(item) {
    return `${item.isPeriod ? (format(new Date(item.period[0]), 'dd/MM/yyyy') + ' - ' + format(new Date(item.period[1]), 'dd/MM/yyyy')) : format(new Date(item.date), 'dd/MM/yyyy')}`;
}

const selector = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const BookingTourContainer = ({ tour, roomTypes, clients }) => {

    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [availability, setAvailability] = useState();
    const [openBookingDialog, setOpenBookingDialog] = useState(false);

    const [periodSelected, setPeriodSelected] = useState();
    const [types, setTypes] = useState([]);
    const [typesCount, setTypesCount] = useState({});
    const [bookings, setBookings] = useState([]);

    const { mutate: create } = useMutation(addBooking, {
        onSuccess: (data) => {
            closeBookingDialog();
            router.push(`/${getTenant()}/orders`);
        },
        onError: (error) => {
          alert(error.response.data.message);
        }
    });

    const updateAvailability = async () => {
        let date = getDate(periodSelected);
        let parse = String(date).replace(/\//g, ".").replace(/ /g,"");
        let data = await getAvailability(parse, tour._id);
        setAvailability(data.total);
    }

    useEffect(() => {
        if(periodSelected){
            updateAvailability();
        }
        
        return () => {
            setAvailability();
        };
    }, [periodSelected]);

    function getAdults(type) {
        return roomTypes.find(d=>d.name===type)?.persons || 1
    }

    const handleTypePeriod = op => {
        setTypesCount({});
        if (op) {
            setPeriodSelected(op);
            let t = tour.details.find(d => d.id === op.id).offers;
            setTypes(t);
        }
        else {
            setPeriodSelected();
            setTypes([]);
        }

    }

    const handleChange = (key, value) => {
        setTypesCount({ ...typesCount, [key]: value });
    };

    const add = () => {
        let p = getDate(periodSelected);
        let upd = bookings.find(d => d.period === p);

        if (!upd) {
            let currentTypes = Object.keys(typesCount);
            currentTypes.forEach(item => {
                for (let index = 0; index < typesCount[item]; index++) {
                    let persons = parseInt(getAdults(item));
                    setBookings(bookings => [...bookings, {
                        period: p,
                        type: item,
                        adults: persons,
                        childrensCount: 0,
                        childrenTotal: 0,
                        infantCount: 0,
                        infantTotal: 0,
                        total: getTotal(persons, item)
                    }]);
                }
            });
        }
    }

    const removeBooking = pos => {
        let arr = [...bookings];
        arr.splice(pos, 1);
        setBookings(arr);
    }

    function getTotal(personsCount, type) {
        let total = 0;
        if (typesCount[type] > 0) {
            let t = periodSelected.offers.find(d => d.room == type);
            let price = user.tenant.type === "Wholesaler" ? parseFloat(t.priceAdult) : parseFloat(t.priceRetailAdult);
            total += price * personsCount;
        }
      
        return parseFloat(total);
    }

    const handleChildren = (room, count, pos) => {
        let t = periodSelected.offers.find(d => d.room == room);

        let price = user.tenant.type === "Wholesaler" ? parseFloat(t.priceChildren) : parseFloat(t.priceRetailChildren);
        const total = price * parseInt(count);

        let upd = [...bookings];
        let book = upd[pos];
        book.childrenTotal = total > 0 ? total : 0;
        book.childrensCount = parseInt(count) || 0;
        upd[pos] = book;
        setBookings(upd);
    }

    const handleInfante = (room, count, pos) => {
        let t = periodSelected.offers.find(d => d.room == room);

        let price = user.tenant.type === "Wholesaler" ? parseFloat(t.priceInfant) : parseFloat(t.priceRetailInfant);
        const total = price * parseInt(count);

        let upd = [...bookings];
        let book = upd[pos];
        book.infantTotal = total > 0 ? total : 0;
        book.infantCount = parseInt(count) || 0;
        upd[pos] = book;
        setBookings(upd);
    }

    const handleBookingDialog = () => {
        setOpenBookingDialog(true);
    }

    const closeBookingDialog = () => {
        setOpenBookingDialog(false);
    }

    const getTotalPersons = () => {
        let persons = bookings.reduce((a, c) => (a + c.adults), 0);
        let childrens = bookings.reduce((a, c) => (a + c.childrensCount), 0);
        let infants = bookings.reduce((a, c) => (a + c.infantCount), 0); 
        return persons + childrens + infants;
    }

    const getTotalPrice = () => {
        return parseFloat(bookings.reduce((a, c) => (a + c.total + c.childrenTotal + c.infantTotal), 0)).toFixed(2);
    }

    const save = (data) => {
        data.type = 'tour';
        data.hotel = tour;
        data.order = bookings;
        create(data);
    }

    const soldout = () => {
       return periodSelected ? parseInt(availability) + parseInt(getTotalPersons()) > parseInt(periodSelected.availability) : false; 
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant={'h4'}>{tour.name}</Typography>
                {availability >= 0 && <Typography variant={'body1'}>{`Disponibilidad: ${availability}/${periodSelected?.availability}`}</Typography>} 
            </Grid>
            <Grid item xs={12} md={3}>
                <Grid container mt={3}>
                    <Grid item xs={12}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            value={periodSelected}
                            options={tour.details}
                            size={'small'}
                            onChange={(event, op) => {
                                handleTypePeriod(op);
                            }}
                            sx={{ zIndex: '-999' }}
                            getOptionLabel={(option) => getDate(option)}
                            renderInput={(params) => <TextField fullWidth {...params} label="Oferta" />}
                        />
                    </Grid>
                    <Grid item xs={12} mt={2}>
                        {
                            types.length > 0 && <Divider sx={{ mt: 2 }}>{'Cantidad'}</Divider>
                        }
                        {
                            types.length > 0 && types.map((item, index) =>

                                <Autocomplete
                                    sx={{ mt: 2 }}
                                    key={`${item.room}${index}`}
                                    disablePortal
                                    id={`${item.room}${index}`}
                                    options={selector}
                                    size={'small'}
                                    onChange={(event, op) => {
                                        handleChange(item.room, op);
                                    }}
                                    getOptionLabel={(option) => option}
                                    renderInput={(params) => <TextField fullWidth {...params} label={item.room !== 'Sin habitación' && item.room} />}
                                />
                            )}
                        {
                            types.length > 0 &&
                            <Button variant={'contained'} fullWidth sx={{ mt: 3 }} onClick={add}>
                                {'Agregar'}
                            </Button>
                        }
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={9} p={2}>
                <BookingTourTable data={bookings} remove={removeBooking} handleChildren={handleChildren} handleInfante={handleInfante} />
            </Grid>
            <Grid item xs={12} p={2}>
                <Grid container justifyContent={'flex-end'}>
                    {
                        soldout() && 
                        <p style={{color: 'red', marginRight: '20px'}}>{'Has sobrepasado la cantidad de personas disponibles para este tour.'}</p>
                    }
                    
                    <Button variant='contained' size='small' onClick={handleBookingDialog} disabled={bookings.length===0 || soldout()}>
                        {'Reservar'}
                    </Button>
                </Grid>
            </Grid>

            <CreateBooking
                open={openBookingDialog}
                close={closeBookingDialog}
                save={save}
                clients={clients}
                totalGuests={getTotalPersons()}
                totalPrice={getTotalPrice()}
            />

        </Grid>
    );
};

export default BookingTourContainer;