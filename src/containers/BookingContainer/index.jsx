import React, { useState, useContext } from 'react';
import { Grid, Typography, Divider, Button, Autocomplete } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BookingTable from './components/BookingTable';
import { differenceInDays } from 'date-fns';
import AuthContext from '../../providers/AuthContext';
import CreateBooking from './components/CreateBooking';

function getOfferPrice(offers, dateSelected, defaultPrice, tenantType) {
    let price = defaultPrice ? defaultPrice : 0;
    offers.forEach(item => {
        if (new Date(item.date[0]) <= dateSelected[1] && new Date(item.date[1]) >= dateSelected[1]) {
            price = tenantType === "Wholesaler" ? item.price : item.priceRetail;
        }
    });
    return parseFloat(price);
}

function getAdults(type) {
    switch (type) {
        case "Sencilla":
            return 1;
        case "Doble":
            return 2;
        case "Triple":
            return 3;
        default:
            return 1;
    }
}

const selector = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const DatePickerCustom = styled(DatePicker)(({ theme }) => ({
    border: '1px solid #bfbfbf',
    borderRadius: '3px',
    height: '40px',
    padding: '2.5px 4px 2.5px 6px',
    width: '100%'
}));

const BookingContainer = ({ hotel }) => {

    const { user } = useContext(AuthContext);

    const [openBookingDialog, setOpenBookingDialog] = useState(false);

    const [value, setValue] = useState([null, null]);
    const [startDate, endDate] = value;

    const [room, setRoom] = useState('');
    const [types, setTypes] = useState([]);
    const [childrens, setChildrens] = useState([]);
    const [typesSelected, setTypesSelected] = useState({});
    const [childrensSelected, setChildrensSelected] = useState(0);

    const [bookings, setBookings] = useState([]);

    const handleRoom = (value) => {
        if (value) {
            setRoom(value);
            let types = hotel.rooms.find(d => d.name === value).types;
            let childrens = hotel.rooms.find(d => d.name === value).childrens;
            setTypes(types);
            setTypesSelected(getTypes(types));
            setChildrens(childrens);
        }
        else {
            setRoom('');
            setTypes([]);
            setTypesSelected({});
            setChildrensSelected(0);
            setChildrens([]);
        }
    };

    const handleChange = (key, value) => {
        setTypesSelected({ ...typesSelected, [key]: value });
    };

    function getTypes(types) {
        let obj = {};
        types.map(item => obj[item.description] = 0);
        return obj;
    }

    const handleChildren = (room, count, pos) => {
        let currentRoom = hotel.rooms.find(d => d.name === room);
        let c = currentRoom.childrens.find(d => d.count === parseInt(count));
        let childrensPrice = c ? getOfferPrice(c.offers, value, c.price) : 0;

        if (parseInt(count) === 2) {
            let firstChildren = currentRoom.childrens.find(d => d.count === 1);
            childrensPrice += firstChildren ? getOfferPrice(firstChildren.offers, value, c.price) : 0;
        }

        const days = differenceInDays(value[1], value[0]);
        let total = parseFloat(childrensPrice) * parseInt(days);

        let upd = [...bookings];
        let book = upd[pos];
        book.childrenTotal = total > 0 ? total : 0;
        book.childrensCount = count ? count : 0;
        upd[pos] = book;
        setBookings(upd);
    }

    const add = () => {
        let upd = bookings.find(d => d.room.id === room);

        if (!upd && value[0]) {
            let currentTypes = Object.keys(typesSelected);
            currentTypes.forEach(item => {
                for (let index = 0; index < typesSelected[item]; index++) {
                    let rm = hotel.rooms.find(d => d.name === room);
                    setBookings(bookings => [...bookings, {
                        date: value,
                        room: rm,
                        type: item,
                        adults: getAdults(item),
                        childrens: rm.childrens,
                        childrensCount: 0,
                        childrenTotal: 0,
                        total: getTotal(item)
                    }]);
                }
            });
        }
    }


    function getTotal(type) {
        let currentRoom = hotel.rooms.find(d => d.name === room);
        // let currentTypes = Object.keys(typesSelected);

        let total = 0;
        if (typesSelected[type] > 0) {
            let t = currentRoom.types.find(d => d.description == type);
            let prc = getOfferPrice(t.offers, value, t.price, user.tenant.type);
            total += prc * getAdults(type);
        }
      
        let childrensPrice = 0;
        if (parseInt(childrensSelected) > 0) {
            let c = currentRoom.childrens.find(d => d.count === parseInt(childrensSelected));
            childrensPrice = getOfferPrice(c.offers, value, c.price, user.tenant.type);
        }

        const days = differenceInDays(value[1], value[0]);
        return (parseFloat(total) + parseFloat(childrensPrice)) * parseInt(days);
    }

    const removeBooking = pos => {
        let arr = [...bookings];
        arr.splice(pos, 1);
        setBookings(arr);
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
        return persons + childrens;
    }

    const save = () => {

    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant={'h4'}>{hotel.name}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
                <Grid container mt={3}>
                    <Grid item xs={12}>
                        <DatePickerCustom
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => {
                                setValue(update);
                            }}
                            placeholderText={'Fecha'}
                            withPortal
                            isClearable={true}
                        />
                    </Grid>
                    <Grid item xs={12} mt={2}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={hotel.rooms}
                            size={'small'}
                            onChange={(event, room) => {
                                handleRoom(room?.name);
                            }}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField fullWidth {...params} label="Habitación" />}
                        />
                        {
                            types.length > 0 && value[0] && <Divider sx={{ mt: 2 }}>{'Cantidad'}</Divider>
                        }
                        {
                            value[0] && types.map((item, index) =>

                                <Autocomplete
                                    sx={{ mt: 2 }}
                                    key={index}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={selector}
                                    size={'small'}
                                    onChange={(event, op) => {
                                        handleChange(item.description, op);
                                    }}
                                    getOptionLabel={(option) => option}
                                    renderInput={(params) => <TextField fullWidth {...params} label={item.description} />}
                                />
                            )}
                        {
                            types.length > 0 && value[0] &&
                            <Button variant={'contained'} fullWidth sx={{ mt: 3 }} onClick={add}>
                                {'Agregar'}
                            </Button>
                        }
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} md={9} p={2}>
                <BookingTable data={bookings} remove={removeBooking} handleChildren={handleChildren} />
            </Grid>
            <Grid item xs={12} p={2}>
                <Grid container justifyContent={'flex-end'}>
                    <Button variant='contained' size='small' onClick={handleBookingDialog} disabled={bookings.length===0}>
                        {'Reservar'}
                    </Button>
                </Grid>
            </Grid>

            <CreateBooking
                open={openBookingDialog}
                close={closeBookingDialog}
                save={save}
                totalGuests={getTotalPersons()}
            />
                        
        </Grid>
    );
};

export default BookingContainer;