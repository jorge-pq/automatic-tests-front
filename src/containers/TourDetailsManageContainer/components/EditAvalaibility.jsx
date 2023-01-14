import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DatePicker from 'react-datepicker';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';


const DatePickerCustom = styled(DatePicker)(({ theme }) => ({
  border: '1px solid #bfbfbf',
  borderRadius: '3px',
  height: '40px',
  padding: '2.5px 4px 2.5px 6px',
  width: '100%'
}));

const EditAvalaibility = ({ open, close, selected, updateAvalaibility }) => {

  const [value, setValue] = useState(0);

  const [dateOfferType, setDateOfferType] = useState([null, null]);
  const [startDateOfferType, endDateOfferType] = dateOfferType;

  const [date, setDate] = useState(new Date());

  const handleValue = e => {
    setValue(e.target.value);
  }

  useEffect(() => {
    setValue(selected.availability);
    if(selected.isPeriod){
      setDateOfferType([new Date(selected.period[0]), new Date(selected.period[1])]);
    }
    else{
      setDate(new Date(selected.date));
    }
   
    return () => {
      setValue(0);
    };
  }, [selected.id]);

  const save = () => {
    updateAvalaibility(value, selected.id, dateOfferType, date);
  }

  return (
    <Dialog open={open}>
      <DialogTitle>
        {'Editar disponibilidad'}
        <IconButton
          aria-label="close"
          onClick={close}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack direction={'row'} spacing={1} sx={{ width: '100%' }} mt={2}>
          {
            selected.isPeriod ?
              <>
                <Grid xs={7} item sx={{ marginLeft: '-8px !important' }}>
                  <DatePickerCustom
                    selectsRange={true}
                    startDate={startDateOfferType}
                    endDate={endDateOfferType}
                    onChange={(update) => {
                      setDateOfferType(update);
                    }}
                    placeholderText={'Período'}
                    withPortal
                    isClearable={true}
                  />
                </Grid>
              </>
              :
              <Grid xs={7} item sx={{ marginLeft: '-8px !important' }}>
                <DatePickerCustom
                  selected={date}
                  onChange={(date) => setDate(date)}
                  placeholderText={'Fecha'}
                  withPortal
                  isClearable={true}
                />
              </Grid>
          }
          <Grid xs={5} item>
            <TextField
              fullWidth
              inputProps={{ min: 0 }}
              type="number"
              size={'small'}
              value={value}
              onChange={handleValue}
              label="Disponibilidad"
            />
          </Grid>
        </Stack>

      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cerrar</Button>
        <Button variant={'contained'} onClick={save}>{'Guardar'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAvalaibility;