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
import {getTenant} from '../utils/util';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import StoreIcon from '@mui/icons-material/Store';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';


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

export default function Layout({children, page}) {

  const { isAuth, setAuth, user } = React.useContext(AuthContext);
  const router = useRouter();

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const goToManage = () => {
    router.push(`/${getTenant()}/manage/hotels`);
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
            { isAuth && <Typography>{user.fullname}</Typography> }
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
            <Link href='/' sx={{textDecoration:'none', textTransform: 'uppercase',backgroundColor:'#e7e7e7', borderRadius: '5px', padding:'1px 5px'}}>
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
              <ListItemText primary="Inicio" />
            </ListItemButton>
            {user?.tenant?.type === "Wholesaler" &&
              <>
                <ListItemButton onClick={goToManage}>
                  <ListItemIcon>
                    <LocalHotelIcon />
                  </ListItemIcon>
                  <ListItemText primary="Gestionar hoteles" />
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
              (user?.tenant?.type === "Wholesaler" || user?.tenant?.type === "Retail") &&
              <ListItemButton onClick={goToOrders}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Órdenes" />
              </ListItemButton>
            }
            <Divider sx={{ my: 1 }} />
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
