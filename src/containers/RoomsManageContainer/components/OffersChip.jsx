import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { format } from 'date-fns'


function getFormatDate(value) {
    const dt = '';
    try {
        dt = value ? format(value[0], 'dd/MM/yyyy') + ' - ' + format(value[1], 'dd/MM/yyyy') : '';
    } catch (error) {
        dt = value ? format(new Date(value[0]), 'dd/MM/yyyy') + ' - ' + format(new Date(value[1]), 'dd/MM/yyyy') : '';
    }

    return dt;
}

const OffersChip = ({data, handleDeleteOffer}) => {

    return (
        <Stack direction="row" spacing={1}>
            {
                data.map((item, index) => <Chip key={index} label={`${getFormatDate(item.date)} : $${item.price}`} onDelete={()=>handleDeleteOffer(item)} />)
            }
        </Stack>
    );
};

export default OffersChip;