import React, { useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit'
import { useMutation } from 'react-query';
import { addClient, updateClient, addClientBulk } from '../../services/client.service';
import ClientCreateDialog from './ClientCreateDialog';
import ClientEditDialog from './ClientEditDialog';
import {useRouter} from 'next/router';
import readXlsxFile from 'read-excel-file';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import {convertExcelToArray} from '../../utils/util';


const ClientsContainer = ({ clients }) => {

    const router = useRouter();

    const inputFileRef = useRef(null);

    const [loading, setLoading] = useState(false);

    const [openDialogCreate, setOpenDialogCreate] = useState(false);
    const [openDialogEdit, setOpenDialogEdit] = useState(false);
    const [selected, setSelected] = useState();

    const { mutate: create } = useMutation(addClient, {
        onSuccess: (data) => {
            setOpenDialogCreate(false);
            router.reload();
        },
        onError: (error) => {
            alert('Error! ');
        }
    });

    const { mutate: bulkcreate } = useMutation(addClientBulk, {
        onSuccess: (data) => {
            setOpenDialogCreate(false);
            router.reload();
        },
        onError: (error) => {
            alert('Error! ');
        }
    });

    const { mutate: update} = useMutation(updateClient, {
        onSuccess: (data) => {
            setOpenDialogEdit(false);
            router.reload();
        },
        onError: (error) => {
          alert('Error! ');
        }
      });

    const showDialogCreate = () => setOpenDialogCreate(true);
    const closeDialogCreate = () => setOpenDialogCreate(false);

    const closeDialogEdit = () => setOpenDialogEdit(false);

    const onEdit = value => {
        setSelected(value);
        setOpenDialogEdit(true);
    }

    const handleExcel = async event => {
        setLoading(true);
        if (event.target.files[0]) {
            let allowedExtension = /(.xls|.xlsx)$/i;
            if(!allowedExtension.exec(inputFileRef.current.value)){
                alert("El fichero insertado no es válido.");
                setLoading(false);
            }
            else{
                let excel = await readXlsxFile(event.target.files[0]);
                try {
                    let result = convertExcelToArray(excel);
                    bulkcreate({bulk: result});
                } catch (error) {
                    alert("Hubo un error leyendo el fichero.");
                    setLoading(false);
                }
            }     
        }
        setLoading(false);
        inputFileRef.current.value = "";
    };


    const openDialogImport = event => {
        inputFileRef.current.click();
    };

    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography variant={'h6'}>{'Lista de hoteles'}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Grid container justifyContent={'flex-end'}>
                    <Button variant={'contained'} sx={{mr: 3}} onClick={openDialogImport} disabled={loading} startIcon={<TextSnippetIcon />} >{loading ? 'Cargando...' :'Importar clientes'}</Button>
                    <Button variant={'contained'} onClick={showDialogCreate}>{'Agregar cliente'}</Button>
                </Grid>
                <input type="file" style={{ display: 'none' }} ref={inputFileRef} onChange={handleExcel} accept=".xls,.xlsx" />
            </Grid>
            <Grid item xs={12} mt={2}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 300 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>{'Nombre'}</TableCell>
                                <TableCell>{'Telefono'}</TableCell>
                                <TableCell>{'Correo'}</TableCell>
                                <TableCell>{'Fecha de nacimiento'}</TableCell>
                                <TableCell>{'ID'}</TableCell>
                                <TableCell>{'Estado'}</TableCell>
                                <TableCell>{'Ciudad'}</TableCell>
                                <TableCell>{'Dirección'}</TableCell>
                                <TableCell>{'Código postal'}</TableCell>
                                <TableCell align="center">{'Acción'}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clients.map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {`${row.name} ${row.secondname || ''} ${row.lastname} ${row.secondlastname || ''}`}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.phone}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.email}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {new Date(row.birthday).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.clientID}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.state}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.city}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.address}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.zipcode}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="EDITAR">
                                            <IconButton onClick={()=>onEdit(row)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <ClientCreateDialog open={openDialogCreate} close={closeDialogCreate} save={create} />
           {selected && <ClientEditDialog open={openDialogEdit} client={selected} close={closeDialogEdit} save={update} />}                     
        </Grid>
    );
};

export default ClientsContainer;