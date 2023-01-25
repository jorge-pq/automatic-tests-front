import React from 'react';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';


const BodyTab = () => {

    const [value, setValue] = React.useState('form-data');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <FormControl>
                    <RadioGroup
                        row
                        value={value}
                        onChange={handleChange}
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="form-data" control={<Radio />} label="Form Data" />
                        <FormControlLabel value="raw" control={<Radio />} label="Raw" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                {
                    value === 'form-data' ?
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Key</TableCell>
                                    <TableCell align="center">Value</TableCell>
                                    <TableCell align="center">Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center">
                                        <TextField size='small' />
                                    </TableCell>
                                    <TableCell align="center">
                                        <TextField size='small' />
                                    </TableCell>
                                    <TableCell align="center">
                                        <TextField size='small' />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer> :
                    <TextareaAutosize placeholder="Json" minRows={7} style={{width: '100%'}} />
                }
            </Grid>
        </Grid>
    );
};

export default BodyTab;