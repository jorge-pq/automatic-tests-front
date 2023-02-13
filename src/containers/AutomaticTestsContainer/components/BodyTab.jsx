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
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


const BodyTab = ({ raw, handleRaw, tab, handleTab, formData, addRowToFormData, removeRowToFormData, handleFormData }) => {

    return (
        <Grid container>
            <Grid item xs={12}>
                <FormControl>
                    <RadioGroup
                        row
                        value={tab}
                        onChange={handleTab}
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="form-data" control={<Radio />} label="Formulario" />
                        <FormControlLabel value="raw" control={<Radio />} label="Json" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                {
                    tab === 'form-data' ?
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Llave</TableCell>
                                        <TableCell align="center">Valor</TableCell>
                                        <TableCell align="center">Descripción</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        formData.map((item, index) =>
                                            <TableRow key={index}>
                                                <TableCell align="center">
                                                    <TextField size='small' value={item.key} onChange={e => handleFormData(index, 'key', e.target.value)} />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <TextField size='small' value={item.value} onChange={e => handleFormData(index, 'value', e.target.value)} />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <TextField size='small' value={item.description} onChange={e => handleFormData(index, 'description', e.target.value)} />
                                                </TableCell>
                                                <TableCell align="center">
                                                    {
                                                        formData.length - 1 > index &&
                                                        <IconButton color="error" component="label" onClick={() => removeRowToFormData(index)}>
                                                            <RemoveCircleOutlineIcon />
                                                        </IconButton>
                                                    }
                                                    {
                                                        formData.length - 1 === index &&
                                                        <IconButton color="primary" component="label" onClick={addRowToFormData}>
                                                            <AddCircleOutlineIcon />
                                                        </IconButton>
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer> :
                        <TextareaAutosize value={raw} onChange={handleRaw} placeholder="Json" minRows={7} style={{ width: '100%' }} />
                }
            </Grid>
        </Grid>
    );
};

export default BodyTab;