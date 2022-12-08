import React from 'react';
import HotelCard from './HotelCard';
import Grid from '@mui/material/Grid';

const ToursContainer = ({data}) => {

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

export default ToursContainer;