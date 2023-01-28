import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import TextField from '@mui/material/TextField';


export default function Search({url, onChange, methods, handleMethod, selectedMethod}) {

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
 
  const handleMenuItemClick = (value) => {
    handleMethod(value);
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
    <React.Fragment>
      <ButtonGroup variant="contained" size='small' fullWidth aria-label="split button">
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
        >
          {selectedMethod || 'Method'}
          <ArrowDropDownIcon />
        </Button>
        <Popper
          sx={{
            zIndex: 1
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
                  <MenuList id="split-button-menu" autoFocusItem sx={{ zIndex: 9 }}>
                    {methods.map(option => (
                      <MenuItem
                        key={option}
                        selected={option === selectedMethod}
                        onClick={() => handleMenuItemClick(option)}
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
        <TextField variant='outlined' defaultValue={url} onChange={onChange} fullWidth label={'URL'} placeholder={'http://api.example.com'} />
      </ButtonGroup>
    </React.Fragment>
  );
}