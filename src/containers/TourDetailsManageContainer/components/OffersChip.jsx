import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';


const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 700,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

const OffersChip = ({ data, handleDeleteOffer }) => {

    return (
        <Stack direction="row" spacing={1}>
            {
                data.map((item, index) =>
                    <HtmlTooltip
                        title={
                            <React.Fragment>
                                    <ul>
                                        <li>Costo adultos: <b>${item.costAdult}</b> - Precio publico de adultos: <b>${item.priceAdult}</b> - Precio minorista de adultos: <b>${item.priceRetailAdult}</b></li>
                                        <li>Costo niños: <b>${item.costChildren}</b> -  Precio publico de niños: <b>${item.priceChildren}</b> - Precio minorista de niños: <b>${item.priceRetailChildren}</b></li>
                                        <li>Costo infantes: <b>${item.costInfant}</b> -  Precio publico de infantes: <b>${item.priceInfant}</b> - Precio minorista de infantes: <b>${item.priceRetailInfant}</b></li>
                                    </ul>
                            </React.Fragment>
                        }
                    >
                        <Chip
                            key={index}
                            // label={getFormatDate(item.date, item.period, item.isPeriod)}
                            label={item.room}
                            onDelete={() => handleDeleteOffer(item)}
                        />
                    </HtmlTooltip>
                )
            }
        </Stack >
    );
};

export default OffersChip;