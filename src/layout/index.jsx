import React from 'react';
import Container from '@mui/material/Container';
import AppBar from './components/AppBar'

const Layout = ({children}) => {
    return (
        <>
          <AppBar />
          <Container sx={{pt: 4}}>
            {children}  
          </Container>
        </>
    );
};

export default Layout;