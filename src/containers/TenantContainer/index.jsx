import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import AuthContext from '../../providers/AuthContext';


const TenantContainer = ({ data }) => {

    const { user } = React.useContext(AuthContext);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>{'Name'}</TableCell>
                        {user?.role === 'super_admin' && <TableCell>{'Retails'}</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            {user?.role === 'super_admin' && 
                                <TableCell component="th" scope="row">
                                    <Stack direction="row" spacing={1}>
                                        {row.brokers.map((item) => (
                                            <Chip key={item._id} label={item.name} />
                                        ))}
                                    </Stack>
                                </TableCell>
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TenantContainer;