import React, { useState } from 'react';
import { Grid, Typography, Divider, Button, Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import BookingTable from './components/BookingTable';
import { differenceInDays } from 'date-fns'

function getOfferPrice(offers, dateSelected, defaultPrice){
    let price = defaultPrice ? defaultPrice : 0;
    offers.forEach(item => {
        if(new Date(item.date[0]) < dateSelected[0] && new Date(item.date[1]) > dateSelected[1]){
            price = item.price;
        }
    });
    return price;
}

const selector = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const BookingContainer = ({ hotel }) => {

    const [value, setValue] = React.useState([null, null]);

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

    const handleChildren = value => {
        setChildrensSelected(value);
    }

    const add = () => {
        let upd = bookings.find(d => d.room.id === room);
        if (!upd && value[0]) {
            setBookings(bookings => [...bookings, {
                date: value,
                room: hotel.rooms.find(d => d.name === room),
                types: typesSelected,
                childrens: childrensSelected,
                total: getTotal()
            }]);
        }
    }


    function getTotal() {
        let currentRoom = hotel.rooms.find(d => d.name === room);
        let currentTypes = Object.keys(typesSelected);
        
        let total = 0;
        currentTypes.forEach(item => {
            if (typesSelected[item] > 0) {
                let t = currentRoom.types.find(d => d.description == item);
                let prc = getOfferPrice(t.offers, value, t.price);
                total += prc * typesSelected[item];
            }
        });

        let childrensPrice = 0;
        if (parseInt(childrensSelected) > 0) {
            let c = currentRoom.childrens.find(d => d.count === parseInt(childrensSelected));
            childrensPrice = getOfferPrice(c.offers, value, c.price);
        }

        const days = differenceInDays(value[1], value[0]);
        return (parseFloat(total) + parseFloat(childrensPrice)) * parseInt(days);
    }

    const removeBooking = room => {
        let upd = bookings.filter(d => d.room.name !== room);
        setBookings(upd);
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant={'h4'}>{hotel.name}</Typography>
            </Grid>
            <Grid item xs={12} mt={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                        startText="Check-in"
                        endText="Check-out"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(startProps, endProps) => (
                            <React.Fragment>
                                <TextField {...startProps} size={'small'} />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <TextField {...endProps} size={'small'} />
                            </React.Fragment>
                        )}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={3} mt={2}>
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
                    childrens.length > 0 && value[0] && 

                    <Autocomplete
                        sx={{ mt: 2 }}
                        disablePortal
                        id="combo-box-demo"
                        options={childrens}
                        size={'small'}
                        onChange={(event, op) => {
                            handleChildren(op?.count);
                        }}
                        getOptionLabel={(option) => String(option.count)}
                        renderInput={(params) => <TextField fullWidth {...params} label={'Niños'} />}
                    />
                }
                {
                    types.length > 0 && value[0] &&
                    <Button variant={'contained'} fullWidth sx={{ mt: 3 }} onClick={add}>
                        {'Agregar'}
                    </Button>
                }

            </Grid>
            <Grid item xs={12} md={9} p={2}>
                <BookingTable data={bookings} remove={removeBooking} />
            </Grid>

        </Grid>
    );
};

export default BookingContainer;