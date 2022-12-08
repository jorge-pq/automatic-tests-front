import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { format } from 'date-fns'


function getFormatDate(date, period, isPeriod) {
    let dt = '';
    if (isPeriod) {
        try {
            dt = period ? format(period[0], 'dd/MM/yyyy') + ' - ' + format(period[1], 'dd/MM/yyyy') : '';
        } catch (error) {
            dt = period ? format(new Date(period[0]), 'dd/MM/yyyy') + ' - ' + format(new Date(period[1]), 'dd/MM/yyyy') : '';
        }
    }
    else {
        dt = date ? format(date, 'dd/MM/yyyy') : '';
    }

    return dt;
}

const OffersChip = ({data, handleDeleteOffer}) => {

    return (
        <Stack direction="row" spacing={1}>
            {
                data.map((item, index) => <Chip key={index} label={getFormatDate(item.date, item.period, item.isPeriod)} onDelete={()=>handleDeleteOffer(item)} />)
            }
        </Stack>
    );
};

export default OffersChip;