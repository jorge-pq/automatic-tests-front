import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

export default function SaveUrlTestDialog({ open, close, results }) {

    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle>{'Results'}</DialogTitle>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Description</TableCell>
                                <TableCell align="left">Result</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                results.map((item, index) =>
                                    <TableRow key={index}>
                                        <TableCell align="left">
                                            {item.description}
                                        </TableCell>
                                        <TableCell align="left">
                                            <Chip label={item.isSuccess ? 'Success' : 'Failed'} color={item.isSuccess ? 'success' : 'error'} />
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions sx={{ mr: 2 }}>
                <Button onClick={close}>{'Cerrar'}</Button>
            </DialogActions>
        </Dialog >
    );
}
