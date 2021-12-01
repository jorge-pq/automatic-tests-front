import React from 'react';
import HotelCard from './components/HotelCard';
import { Grid } from '@mui/material';
import { hotels } from '../../../data/hotels';

const HotelsContainer = ({data}) => {
    return (
        <Grid container pb={4}>
            {
                data.map((item, index) =>
                    <Grid key={index} item xs={12} md={4} mt={2}>
                        <HotelCard
                            id={1}
                            item={item}
                        />
                    </Grid>
                )}
        </Grid>
    );
};

export default HotelsContainer;