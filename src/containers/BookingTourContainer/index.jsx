import React, {useState} from 'react';
import { Grid, Typography, Divider, Button, Autocomplete, TextField } from '@mui/material';
import BookingTourTable from './BookingTourTable';
import { format } from 'date-fns'

const BookingTourContainer = ({ tour, roomTypes, clients }) => {
    
    const [offers, setOffers] = useState([]);

    const handleTypeRoom = value => {
        let t = tour.details.find(d=>d.description === value).offers;
        setOffers(t);
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant={'h4'}>{tour.name}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
                <Grid container mt={3}>
                <Grid item xs={12}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={tour.details}
                            size={'small'}
                            onChange={(event, room) => {
                                handleTypeRoom(room.description);
                            }}
                            sx={{ zIndex: '-999' }}
                            getOptionLabel={(option) => option.description}
                            renderInput={(params) => <TextField fullWidth {...params} label="Tipo habitacion" />}
                        />
                    </Grid>
                    <Grid item xs={12} mt={2}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={offers}
                            size={'small'}
                            // onChange={(event, room) => {
                            //     handleRoom(room?.name);
                            // }}
                            sx={{ zIndex: '-999' }}
                            getOptionLabel={(option) => `${ option.isPeriod ? (format(new Date(option.period[0]), 'dd/MM/yyyy') + ' ' + format(new Date(option.period[1]), 'dd/MM/yyyy')):format(new Date(option.date), 'dd/MM/yyyy') } `}
                            renderInput={(params) => <TextField fullWidth {...params} label="Oferta" />}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={9} p={2}>
                <BookingTourTable />
            </Grid>
        </Grid>
    );
};

export default BookingTourContainer;