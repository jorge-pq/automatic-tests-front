import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const AuthorizationTab = () => {

    const [authSelected, setAuthSelected] = React.useState(0);

    const handleChange = (event) => {
        setAuthSelected(event.target.value);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={authSelected}
                            label="Type"
                            onChange={handleChange}
                            size={'small'}
                        >
                            <MenuItem value={0}>{'No Auth'}</MenuItem>
                            <MenuItem value={1}>{'API Key'}</MenuItem>
                            <MenuItem value={2}>{'Bearer Token'}</MenuItem>
                            <MenuItem value={3}>{'Basic Auth'}</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Stack direction={'column'} spacing={2}>
                    {
                        authSelected === 1 &&
                        <>
                            <TextField variant='outlined' size='small' fullWidth label={'Key'} />
                            <TextField variant='outlined' size='small' fullWidth label={'Value'} />
                        </>
                    }
                    {
                        authSelected === 2 &&
                        <>
                            <TextField variant='outlined' size='small' fullWidth label={'Token'} />
                        </>
                    }
                    {
                        authSelected === 3 &&
                        <>
                            <TextField variant='outlined' size='small' fullWidth label={'Username'} />
                            <TextField variant='outlined' size='small' fullWidth label={'Password'} />                          </>
                    }
                </Stack>
            </Grid>
        </Grid>
    );
};

export default AuthorizationTab;