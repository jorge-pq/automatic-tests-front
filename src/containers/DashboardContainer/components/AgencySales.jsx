import React, {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Pagination from '../../../components/Pagination';
import {getAgenciesSales} from '../../../services/tenant.service';


const AgencySales = () => {

    const [value, setValue] = React.useState(0);
    const [agencies, setAgencies] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getAgencies = async ()=> {
        let data = await getAgenciesSales(page, value===0?'today':'month');
        setAgencies(data.data);
        setTotalPage(data.pages);
    }

    useEffect(() => {
        getAgencies();
        return () => {
            setAgencies([]);
        };
    }, [page, value]);


    const handlePage = (event, value) => {
        setPage(value);
    }
    return (
        <Paper elevation={3}>
            <Box p={2}>
                <Stack direction={'row'} justifyContent={'space-between'} mb={3}>
                    <Typography variant='h6'>{'Ventas por agencia'}</Typography>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="Hoy" id={0} />
                            <Tab label="Mes" id={1} />
                        </Tabs>
                    </Box>
                </Stack>
                {
                    agencies.map((item, index) =>
                        <Stack key={index} direction={'row'} justifyContent={'space-between'}>
                            <Typography>{item.name}</Typography>
                            <Typography><strong>${parseFloat(item.total).toFixed(2)}</strong></Typography>
                        </Stack>
                    )
                }
                <Stack direction={'row'} justifyContent={'flex-end'} mt={3}>
                    <Pagination page={page} totalPages={totalPage} handleChange={handlePage}/>
                </Stack>
            </Box>
        </Paper>
    );
};

export default AgencySales;