import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import JsPDF from 'jspdf';

const GuestsList = ({ open, close, guests, period }) => {

    const [list, setList] = useState([]);

    useEffect(() => {

        var arr = [];
        guests.forEach(item => {
            item.persons.forEach(i => {
                let obj = i;
                obj.agency = item.agency;
                arr.push(obj);
            });
        });
        setList(arr);

        return () => {
            setList([]);
        };
    }, [period]);

    const exportPdf = () => {
        const report = new JsPDF('portrait', 'pt', 'a4');
        report.html(document.querySelector('#guests')).then(() => {
            report.save('pasajeros.pdf');
        });
    }

    return (
        <Dialog open={open} maxWidth={'lg'}>
            <DialogTitle>
                {'Pasajeros'}
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
                <div id="guests" style={{ width: '100%' }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">{'Nombre'}</TableCell>
                                    {/* <TableCell align="left">{'Telefono'}</TableCell> */}
                                    <TableCell align="left">{'Nombre de contacto'}</TableCell>
                                    <TableCell align="left">{'Telefono de contacto'}</TableCell>
                                    <TableCell align="left">{'Agencia'}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {list.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left" scope="row">
                                            {row.name + ' ' + row.lastname}
                                        </TableCell>
                                        {/* <TableCell align="left">
                                      {row.name}
                                    </TableCell> */}
                                        <TableCell align="left">
                                            {row.contactName}
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.contactPhone}
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.agency}
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>{'Cerrar'}</Button>
                <Button variant={'contained'} onClick={exportPdf}>{'Exportar'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default GuestsList;