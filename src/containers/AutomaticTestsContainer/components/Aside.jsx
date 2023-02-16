import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useMutation } from 'react-query';
import { runAllTestByApp } from '../../../services/test.service';
import { saveNewApp } from '../../../services/app.service';
import RunAllTestsResultDialog from './RunAllTestsResultDialog';
import AddApplicationDialog from './AddApplicationDialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import AddBoxIcon from '@mui/icons-material/AddBox';

export default function Aside({ apps }) {

  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogAddApp, setOpenDialogAddApp] = useState(false);
  const [results, setResults] = useState([]);

  const [search, setSearch] = useState('');

  const goToTest = id => {
    router.push(`/test/${id}`);
  }

  const { mutate: runAll } = useMutation(runAllTestByApp, {
    onSuccess: (data) => {
      setResults(data);
      setOpenDialog(true);
    },
    onError: (error) => {
      alert('Error! ');
    }
  });

  const { mutate: addApp } = useMutation(saveNewApp, {
    onSuccess: (data) => {
      router.reload()
    },
    onError: (error) => {
      alert('Error! ');
    }
  });


  const handleSearch = e => setSearch(e.target.value);

  const handleFilter = value => {
    return String(value.name.toLowerCase()).includes(search.toLowerCase()) && value.tests.length > 0;
  }

  return (
    <>
      <Stack direction={'row'} pr={2}>
        <TextField variant='outlined' value={search} onChange={handleSearch} fullWidth size='medium' placeholder='Buscar aplicación' />
        <IconButton edge="end" aria-label="prueba" onClick={()=>setOpenDialogAddApp(true)}>
          <AddBoxIcon fontSize='large' titleAccess='AGREGAR APLICACION' color='primary' />
        </IconButton>
      </Stack>
      {
        apps.filter(handleFilter).map(item =>
          <Accordion key={item.code.toString()}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{item.name}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ position: 'relative', top: '-20px' }}>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {item.tests.map(t =>
                  <ListItem
                    key={t._id.toString()}
                    secondaryAction={
                      <IconButton edge="end" aria-label="prueba" onClick={() => goToTest(t._id)}>
                        <PlayArrowIcon />
                      </IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton role={undefined} onClick={() => goToTest(t._id)} dense>

                      <ListItemText id={t._id.toString()} primary={t.description} />
                    </ListItemButton>
                  </ListItem>
                )}
                <Divider />
                {
                  item.tests.length > 0 &&
                  <ListItem
                    key={item._id.toString()}
                    secondaryAction={
                      <IconButton edge="end" aria-label="prueba" onClick={() => runAll(item._id)}>
                        <PlayArrowIcon />
                      </IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton role={undefined} onClick={() => runAll(item._id)} dense>
                      <ListItemText id={item._id.toString()} primary={<b>Correr todas las pruebas</b>} />
                    </ListItemButton>
                  </ListItem>
                }
              </List>
            </AccordionDetails>
          </Accordion>
        )
      }

      <RunAllTestsResultDialog open={openDialog} close={() => setOpenDialog(false)} results={results} />
      <AddApplicationDialog open={openDialogAddApp} close={() => setOpenDialogAddApp(false)} save={addApp} />
    </>
  );
}