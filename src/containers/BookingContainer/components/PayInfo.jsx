import React, {useState} from 'react';
import { Grid, Paper, TextField, Autocomplete, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';


const CardEditableInput = styled('input')(({ theme }) => ({
    border: 'none',
    width: '60px',
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: '2.125rem',
    lineHeight: 1.235,
    letterSpacing:'0.00735em',
    outline: 'none'
}));

const InputPrefix = styled('label')(({ theme }) => ({
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: '2.125rem',
    lineHeight: 1.235,
    letterSpacing:'0.00735em'
}));

function getBalance(paid, price, service, discount){
    let result =  parseFloat(paid-(price+service-discount)).toFixed(2);
    return result.toString() === '-0.00' ? 0 : result;
}


const CardPay = ({ label, value, editable, onChange, color }) => {
    return <>
        <Typography variant='body1' sx={{ color: 'gray' }}>{label}</Typography>
        {editable ?
            <>
                <InputPrefix>{'$'}</ InputPrefix>
                <CardEditableInput value={value} type={'number'} onChange={onChange} min={0} />
            </> :
            <Typography variant='h4' sx={{ color: color || 'black' }}>${value}</Typography>}
    </>
}

const types = ['Cash', 'Cash App', 'Zelle', 'Cheque', 'Crédito o Débito', 'Transferencia bancaria'];

const PayInfo = ({price, payType, setPayType, discount, setDiscount,
     service, balance, setBalance, paid, setPaid, handlePaid, handleDiscount}) => {

    return (
        <>
            <Paper elevation={3}>
                <Grid container justifyContent={'center'} p={3} textAlign={'center'}>
                    <Grid item xs={2}>
                        <CardPay label={'Precio'} value={price} />
                    </Grid>
                    <Grid item xs={2}>
                        <CardPay label={'C. Servicio'} value={service} />
                    </Grid>
                    <Grid item xs={2}>
                        <CardPay label={'Descuento'} value={discount} editable onChange={handleDiscount}/>
                    </Grid>
                    <Grid item xs={2}>
                        <CardPay label={'Total'} value={parseFloat(price+service-discount).toFixed(2)} color={'#1976d2'} />
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={3} sx={{ mt: 4 }}>
                <Grid container justifyContent={'center'} p={3} spacing={3}>
                    <Grid item xs={4}>
                        <Autocomplete
                            disablePortal
                            value={payType}
                            options={types}
                            size={'small'}
                            onChange={(event, op) => setPayType(op)}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => <TextField {...params} label={'Tipo de pago'} />}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField type={'number'} value={paid} onChange={handlePaid} size={'small'} inputProps={{ min: 0 }} label={'Pagado'} />
                    </Grid>
                    
                    <Grid item xs={2} sx={{padding: '0 !important'}}>
                        <CardPay label={'Balance'} value={getBalance(paid,price,service,discount)} color={getBalance(paid,price,service,discount)>=0?'green': 'red'}/>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default PayInfo;