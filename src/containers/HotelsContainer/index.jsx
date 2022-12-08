import React from 'react';
import HotelCard from './components/HotelCard';
import { Grid } from '@mui/material';
import {useFilter} from '../../providers/FilterProvider';

const HotelsContainer = ({data}) => {

    const {filter} = useFilter();

    const filtered = value => {
        return String(value.name).toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ? true : false;
    }

    return (
        <Grid container pb={4}>
            {
                data.filter(filtered).map((item, index) =>
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