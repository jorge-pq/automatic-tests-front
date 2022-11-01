import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PaymentIcon from '@mui/icons-material/Payment';
import CloseIcon  from '@mui/icons-material/Close';
import ClientInfo from './ClientInfo';
import GuestInfo from './GuestInfo';
import { useForm } from 'react-hook-form';


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));


function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <PersonIcon />,
    2: <GroupAddIcon />,
    3: <PaymentIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

function fieldsNotRequired(item){
  return item !== 'secondname' && item !== 'secondlastname'
}  

const CreateBooking = ({ open, close, save, totalGuests }) => {

  const { getValues, formState: { errors }, setError, control, clearErrors } = useForm();

  const [birthday, setBirthday] = useState();
  const [expireDate, setExpireDate] = useState();
  const [guests, setGuests] = useState([]);

  const steps = ['Datos del Cliente', 'Datos de los Huéspedes', 'Pago'];
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      alert('Complete!');
      if (validate()) {
       save({guests: guests, client:''});
      }
    }
    else {
      if (validate()) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  
  const addGuest = (data) => {
    let index = guests.findIndex(d=>d.passport===data.passport);
    if(index===-1){
      setGuests(guests => [...guests, data ])
      return true;
    }
    else{
      alert('Este pasaporte ya existe.');
      return false;
    }
  }

  const removeGuest = (passport) => {
    let index = guests.findIndex(d=>d.passport===passport);
    let upd = [...guests];
    upd.splice(index, 1);
    setGuests(upd);
  }

  const validate = () => {
    clearErrors();
    let isValidData = false;
    switch (activeStep) {
      case 0:
        let noValid = 0;
        Object.keys(getValues()).filter(fieldsNotRequired).map((i)=>{
          if(!getValues()[i]){
            setError(i, {}, true);
            noValid++;
          }
        })
        if(!birthday){
          setError('birthday', {}, true)
          noValid++;
        }
        isValidData = noValid === 0 ? true : false;
        break;
      case 1:
        isValidData = guests.length === totalGuests ? true : false;
        break;
      case 2:
        isValidData = true;
      break;
      default:
        break;
    }
    return isValidData
  }

  return (
    <Dialog open={open} onClose={close} maxWidth={'lg'}>
      <DialogTitle>
        Reservación
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
        <Grid container pt={2}>
          <Grid item xs={12}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid item xs={12} mt={3}>
            {activeStep === 0 &&
                <ClientInfo
                  birthday={birthday}
                  setBirthday={setBirthday}
                  control={control}
                  errors={errors}
                />
            }
            {activeStep === 1 &&
              <GuestInfo
                guests={guests}
                addGuest={addGuest}
                removeGuest={removeGuest}
                totalGuests={totalGuests}
              />
            }
            {activeStep === 2 &&
              <></>
            }
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                {'Atrás'}
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Reservar' : 'Siguiente'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBooking;