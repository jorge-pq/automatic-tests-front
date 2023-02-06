import React, {useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useMutation } from 'react-query';
import {runAllTestByApp} from '../../../services/test.service';
import RunAllTestsResultDialog from './RunAllTestsResultDialog';


export default function Aside({ apps }) {

  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);
  const [results, setResults] = useState([]);

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

  return (
    <>
      {
        apps.map(item =>
          <Accordion key={item.code.toString()}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{item.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {
                item.tests.length > 0 &&
                <IconButton color="primary" component="label" onClick={()=>runAll(item._id)}>
                  <PlayArrowIcon />
                  <Typography>
                    {'Run all tests'}
                  </Typography>
                </IconButton>
              }
              {item.tests.map(t =>
                <Typography key={t._id.toString()} onClick={() => goToTest(t._id)} sx={{ textDecoration: 'underline', cursor: 'pointer', color: '#0093ff' }}>
                  {t.description}
                </Typography>)}
            </AccordionDetails>
          </Accordion>
        )
      }

      <RunAllTestsResultDialog open={openDialog} close={()=>setOpenDialog(false)} results={results} />
    </>
  );
}