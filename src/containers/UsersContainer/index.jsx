import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit'
import PasswordIcon from '@mui/icons-material/Password';
import { useMutation } from 'react-query';
import { updatePassword } from '../../services/user.service';
import PasswordEditDialog from './PasswordEditDialog';


function getRole(value){
    switch (value) {
        case 'administrator':
            return "Adnministrador"
        case 'employee':
            return "Empleado"
        default:
            "Administrador";
    }
}

const UsersContainer = ({ users }) => {

    const [openDialogEdit, setOpenDialogEdit] = useState(false);
    const [selected, setSelected] = useState();
    const [userSelected, setUserSelected] = useState();


    const { mutate: editPass } = useMutation(updatePassword, {
        onSuccess: (data) => {
            setOpenDialogEdit(false);
        },
        onError: (error) => {
            alert('Error! ');
        }
    });

    const closeCreateDialogEdit = () => setOpenDialogEdit(false);

    const showEditPass = id => {
        setSelected(id);
        setOpenDialogEdit(true);
    }

    const showEdit = user => {
        setUserSelected(user);
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{'Nombre'}</TableCell>
                            <TableCell>{'Usuario'}</TableCell>
                            <TableCell>{'Telefono'}</TableCell>
                            <TableCell>{'Rol'}</TableCell>
                            <TableCell align="center">{'Acción'}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.fullname}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.username}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.phone}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {getRole(row.role)}
                                </TableCell>
                                {/* <TableCell component="th" scope="row">
                           <Chip label={row.active? 'Activo' : 'Inactivo'} color={row.active ? 'success' : 'error'} />
                        </TableCell> */}
                                <TableCell align="center">
                                <Tooltip title="Editar usuario">
                                        <IconButton onClick={() => showEdit(row)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Editar contraseña">
                                        <IconButton onClick={() => showEditPass(row._id)}>
                                            <PasswordIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {
                selected && <PasswordEditDialog open={openDialogEdit} userId={selected} close={closeCreateDialogEdit} save={editPass} />
            }
        </>

    );
};

export default UsersContainer;