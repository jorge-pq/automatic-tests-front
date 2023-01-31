import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';

export default function Aside({ apps }) {

  const router = useRouter();

  const goToTest = id => {
    router.push(`/test/${id}`);
  }

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
              {item.tests.map(t => 
              <Typography key={t._id.toString()} onClick={()=>goToTest(t._id)} sx={{textDecoration: 'underline', cursor: 'pointer', color: '#0093ff'}}>
                {t.description}
              </Typography>)}
            </AccordionDetails>
          </Accordion>
        )
      }
    </>
  );
}