import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import AuthContext from '../providers/AuthContext';
import { getTenant } from '../utils/util';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import StoreIcon from '@mui/icons-material/Store';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PasswordIcon from '@mui/icons-material/Password';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import ContactsIcon from '@mui/icons-material/Contacts';
import Popover from '@mui/material/Popover';
import NightShelterIcon from '@mui/icons-material/NightShelter';
import GroupIcon from '@mui/icons-material/Group';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

export default function Layout({ children, page }) {

  const { isAuth, setAuth, user } = React.useContext(AuthContext);
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorRes, setAnchorRes] = React.useState(null);

  const openPop = Boolean(anchorEl);
  const id = openPop ? 'simple-popover' : undefined;

  const openPopRes = Boolean(anchorRes);
  const resid = openPop ? 'res-popover' : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickResMenu = (event) => {
    setAnchorRes(event.currentTarget);
  };

  const handleCloseResMenu = () => {
    setAnchorRes(null);
  };

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const goToBookingHotel = () => {
    router.push(`/${getTenant()}/booking_hotel`);
  }

  const goToBookingTour = () => {
    router.push(`/${getTenant()}/booking_tour`);
  }

  const goToManage = () => {
    router.push(`/${getTenant()}/manage/hotels`);
  }

  const goToManageTours = () => {
    router.push(`/${getTenant()}/manage/tours`);
  }


  const goToBusiness = () => {
    router.push(`/${getTenant()}/business`);
  }

  const goToCreateTenant = () => {
    router.push(`/${getTenant()}/create_tenant`);
  }

  const goToAddUser = () => {
    router.push(`/${getTenant()}/add_user`);
  }

  const goToHome = () => {
    router.push("/");
  }
  const goToOrders = () => router.push(`/${getTenant()}/orders`);

  const goToPrices = () => router.push(`/${getTenant()}/prices`);

  const goRoomTypes = () => router.push(`/${getTenant()}/config/room_types`);

  const goToClients = () => router.push(`/${getTenant()}/clients`);

  const goToUsers = () => router.push(`/${getTenant()}/users/${user.tenant._id}`);

  const logout = () => {
    setAuth(false);
    cookie.remove('token');
    cookie.remove('user');
    router.push('/');
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {page}
            </Typography>
            {isAuth && <Typography>{user.fullname}</Typography>}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pr: [1],
            }}
          >
            <Link href='/' sx={{ textDecoration: 'none', textTransform: 'uppercase', backgroundColor: '#e7e7e7', borderRadius: '5px', padding: '1px 5px' }}>
              <Typography variant='button'>{user?.tenant?.name || 'Booking'}</Typography>
            </Link>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItemButton onClick={goToHome}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Dasboard" />
            </ListItemButton>
            <ListItemButton onClick={handleClickResMenu}>
              <ListItemIcon>
                <DateRangeIcon />
              </ListItemIcon>
              <ListItemText primary="Reservar" />
            </ListItemButton>
            <Popover
              id={resid}
              open={openPopRes}
              anchorEl={anchorRes}
              onClose={handleCloseResMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <ListItemButton sx={{ backgroundColor: '#1976d2', width: '200px' }} onClick={goToBookingHotel}>
                <ListItemIcon>
                  <NightShelterIcon />
                </ListItemIcon>
                <ListItemText primary="Hotel" />
              </ListItemButton>
              <ListItemButton sx={{ backgroundColor: '#1976d2' }} onClick={goToBookingTour}>
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText primary="Tour" />
              </ListItemButton>
            </Popover>
            {user?.tenant?.type === "Wholesaler" &&
              <>
                <ListItemButton onClick={goToManage}>
                  <ListItemIcon>
                    <LocalHotelIcon />
                  </ListItemIcon>
                  <ListItemText primary="Gestionar hoteles" />
                </ListItemButton>
                <ListItemButton onClick={goToManageTours}> 
                  <ListItemIcon>
                    <EditLocationAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Gestionar tours" />
                </ListItemButton>
                <ListItemButton onClick={goToBusiness}>
                  <ListItemIcon>
                    <StoreIcon />
                  </ListItemIcon>
                  <ListItemText primary="Lista de minoristas" />
                </ListItemButton>
                <ListItemButton onClick={goToCreateTenant}>
                  <ListItemIcon>
                    <AddBusinessIcon />
                  </ListItemIcon>
                  <ListItemText primary="Agregar minorista" />
                </ListItemButton>
                <ListItemButton onClick={goToClients}>
                  <ListItemIcon>
                    <ContactsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Clientes" />
                </ListItemButton>
              </>
            }
            {user?.role === "super_admin" &&
              <ListItemButton onClick={goToCreateTenant}>
                <ListItemIcon>
                  <AddBusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Agregar mayorista" />
              </ListItemButton>
            }
            {
              user?.tenant?.type === "Retail" &&
              <ListItemButton onClick={goToPrices}>
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary="Gestionar precios" />
              </ListItemButton>
            }
            {
              (user?.tenant?.type === "Wholesaler" || user?.tenant?.type === "Retail") &&
              <ListItemButton onClick={goToOrders}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Órdenes" />
              </ListItemButton>
            }
            <Divider sx={{ my: 1 }} />
            {
              (user?.tenant?.type === "Wholesaler" || user?.tenant?.type === "Retail") &&
              <ListItemButton onClick={goToUsers}>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Usuarios" />
              </ListItemButton>
            }
            <ListItemButton onClick={goToAddUser}>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Agregar usuario" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <PasswordIcon />
              </ListItemIcon>
              <ListItemText primary="Cambiar contraseña" />
            </ListItemButton>
            {user?.tenant?.type === "Wholesaler" &&
              <>
                <ListItemButton onClick={handleClick}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Configuraciones" />
                </ListItemButton>
                <Popover
                  id={id}
                  open={openPop}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <ListItemButton sx={{ backgroundColor: '#1976d2' }} onClick={goRoomTypes}>
                    <ListItemIcon>
                      <NightShelterIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tipos de habitaciones" />
                  </ListItemButton>
                </Popover>
              </>
            }
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Salir" />
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
