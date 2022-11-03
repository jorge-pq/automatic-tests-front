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



const CardPay = ({ label, value, editable, onChange }) => {
    return <>
        <Typography variant='body1' sx={{ color: 'gray' }}>{label}</Typography>
        {editable ?
            <>
                <InputPrefix>{'$'}</ InputPrefix>
                <CardEditableInput value={value} type={'number'} onChange={onChange} min={0} />
            </> :
            <Typography variant='h4'>${value}</Typography>}
    </>
}

const types = ['Cash', 'Cash App', 'Zelle', 'Cheque', 'Crédito o Débito', 'Transferencia bancaria'];

const PayInfo = ({price}) => {

    const [payType, setPayType] = useState('');
    const [discount, setDiscount] = useState(0);
    const service = 1;
    const [balance, setBalance] = useState(0);
    const [paid, setPaid] = useState(0);

    const handlePaid = e => setPaid(e.target.value);

    const handleDiscount = (e) => {
        setDiscount(e.target.value);
    }

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
                        <CardPay label={'Total'} value={parseFloat(price-service-discount).toFixed(2)} />
                    </Grid>
                    <Grid item xs={2}>
                        <CardPay label={'Balance'} value={balance} />
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={3} sx={{ mt: 4 }}>
                <Grid container justifyContent={'center'} p={3} spacing={3}>
                    <Grid item xs={4}>
                        <Autocomplete
                            disablePortal
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
                </Grid>
            </Paper>
        </>
    );
};

export default PayInfo;