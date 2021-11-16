import React, { useState } from 'react';
import { Grid, Typography, Divider, Button } from '@mui/material';
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


const selector = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const BookingContainer = ({ hotel }) => {

    const [value, setValue] = React.useState([null, null]);

    const [room, setRoom] = useState('');
    const [types, setTypes] = useState([]);
    const [childrens, setChildrens] = useState([]);
    const [typesSelected, setTypesSelected] = useState({});
    const [childrensSelected, setChildrensSelected] = useState({});

    const handleRoom = (event) => {
        if (event.target.value) {
            setRoom(event.target.value);
            let types = hotel.rooms.find(d => d.id === event.target.value).types;
            let childrens = hotel.rooms.find(d => d.id === event.target.value).childrens;
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
        let obj = {}
        return types.map(item => obj[item.description] = 0);
    }

    const handleChildren = e => {
        setChildrensSelected(e.target.value);
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
                <FormControl fullWidth margin={'normal'}>
                    <InputLabel id="room-select-label">{'Habitación'}</InputLabel>
                    <Select
                        labelId="room-select-label"
                        value={room}
                        label="Habitación"
                        size={'small'}
                        onChange={handleRoom}
                    >
                        {
                            hotel.rooms.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                {
                    types.length > 0 && <Divider>{'Cantidad'}</Divider>
                }
                {
                    types.map((item, index) =>
                        <FormControl key={index} fullWidth margin={'normal'}>
                            <InputLabel id="single-select-label">{item.description}</InputLabel>
                            <Select
                                labelId="single-select-label"
                                value={typesSelected[item.description]}
                                label={item.description}
                                size={'small'}
                                onChange={e => handleChange(item.description, e.target.value)}
                            >
                                {
                                    selector.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    )}
                {
                    childrens.length > 0 &&

                    <FormControl key={'children'} fullWidth margin={'normal'}>
                        <InputLabel id="single-select-label">{'Niños'}</InputLabel>
                        <Select
                            labelId="single-select-label"
                            value={childrensSelected}
                            label={'Niños'}
                            size={'small'}
                            onChange={handleChildren}
                        >
                            {
                                childrens.map(item => <MenuItem key={item.count} value={item.count}>{item.count}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                }
                {
                    types.length > 0 &&
                    <Button variant={'contained'} fullWidth>
                        {'Agregar'}
                    </Button>
                }

            </Grid>
            <Grid item xs={12} md={9} p={3}>
                 <BookingTable />   
            </Grid>

        </Grid>
    );
};

export default BookingContainer;