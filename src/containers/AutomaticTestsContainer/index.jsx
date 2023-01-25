import React from 'react';
import Grid from '@mui/material/Grid';
import Search from './components/Search';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ParamsTab from './components/ParamsTab';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import TextField from '@mui/material/TextField';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AuthorizationTab from './components/AuthorizationTab';
import HeadersTab from './components/HeadersTab';
import BodyTab from './components/BodyTab';


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const options = ['EQUAL', 'CONTAINS', 'STATUS', 'TOBE'];


const AutomaticTestsContainer = () => {

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const [currentTab, setCurrentTab] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const [selectedIndex, setSelectedIndex] = React.useState(-1);

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <Grid container justifyContent={'center'}>
            <Grid xs={12} md={8} item>
                <Grid container spacing={2}>
                    <Grid item xs={9}>
                        <Search />
                    </Grid>
                    <Grid item xs={3}>
                        <Stack direction={'row'} justifyContent={'flex-end'} spacing={2} sx={{ paddingTop: '2px' }}>
                            <Button variant='contained'>{'Send'}</Button>
                            <Button variant='contained'>{'Save'}</Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={currentTab} onChange={handleTabChange}>
                                <Tab label="Params" {...a11yProps(0)} />
                                <Tab label="Authorization" {...a11yProps(1)} />
                                <Tab label="Headers" {...a11yProps(2)} />
                                <Tab label="Body" {...a11yProps(3)} />
                            </Tabs>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        { currentTab === 0 &&  <ParamsTab /> } 
                        { currentTab === 1 &&  <AuthorizationTab /> }
                        { currentTab === 2 && <HeadersTab /> }
                        { currentTab === 3 && <BodyTab /> }
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='overline'>{'Test Results'}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction={'row'} spacing={2}>
                            <Button
                                ref={anchorRef}
                                size="small"
                                color='info'
                                sx={{ width: '150px' }}
                                aria-controls={open ? 'split-button-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-label="select merge strategy"
                                aria-haspopup="menu"
                                onClick={handleToggle}
                                variant={'contained'}
                            >
                                {options[selectedIndex] || 'Type'}
                                <ArrowDropDownIcon />
                            </Button>
                            <Popper
                                sx={{
                                    zIndex: 1,
                                }}
                                open={open}
                                anchorEl={anchorRef.current}
                                role={undefined}
                                transition
                                disablePortal
                            >
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin:
                                                placement === 'bottom' ? 'center top' : 'center bottom',
                                        }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList id="split-button-menu" autoFocusItem>
                                                    {options.map((option, index) => (
                                                        <MenuItem
                                                            key={option}
                                                            selected={index === selectedIndex}
                                                            onClick={(event) => handleMenuItemClick(event, index)}
                                                        >
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                            <TextField variant='outlined' size='small' fullWidth label={'Expect'} />
                        </Stack>
                    </Grid>
                    <Grid xs={12} item>
                        <TextareaAutosize placeholder="Response" minRows={7} style={{width: '100%'}} />                                    
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AutomaticTestsContainer;