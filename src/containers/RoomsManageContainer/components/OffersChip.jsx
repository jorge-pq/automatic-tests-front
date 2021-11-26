import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { format } from 'date-fns'


function getFormatDate(value){
    return value ? format(value[0], 'dd/MM/yyyy') +' - '+ format(value[1], 'dd/MM/yyyy'): '';
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