import React, {useState, useEffect} from 'react';
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
import Alert from '@mui/material/Alert';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AuthorizationTab from './components/AuthorizationTab';
import HeadersTab from './components/HeadersTab';
import BodyTab from './components/BodyTab';
import Aside from './components/Aside';
import {customget, custompost, customput, customdelete} from '../../lib/request';
import {addUrl, updateUrl} from '../../services/test.service';
import {useRouter} from 'next/router';
import { useMutation } from 'react-query';
import SaveUrlTestDialog from './components/SaveUrlTestDialog'
import {getParameters, getFormData, getHeaders} from '../../utils/util'


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const options = ['EQUAL', 'CONTAINS', 'STATUS'];

const methods = ['GET', 'POST', 'PUT', 'DELETE'];

const AutomaticTestsContainer = ({apps, test}) => {

    const router = useRouter();

    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);

    const [saveUrlDialog, setSaveUrlDialog] = useState(false);

    const [selectedMethod, setSelectedMethod] = useState('');
    const [response, setResponse] = useState('');
    const [expect, setExpect] = useState('');
    const [statusRequest, setStatusRequest] = useState(0);
    const [testResult, setTestResult] = useState({
        message: '',
        type: ''
    });

    const [bodyTab, setBodyTab] = useState('form-data');

    const [params, setParams] = useState([{
        key: '',
        value: '',
        description: ''
    }]);

    const [formData, setFormData] = useState([{
        key: '',
        value: '',
        description: ''
    }]);

     const [headers, setHeaders] = useState([{
        key: '',
        value: '',
        description: ''
    }]);

    const handleBodyTab = (event) => {
        setBodyTab(event.target.value);
    };

    const [url, setUrl] = useState('');
    
    const [raw, setRaw] = useState('');

    const handleRaw = e => setRaw(e.target.value);

    const handleUrl = e => setUrl(e.target.value);

    const handleExpect = e => setExpect(e.target.value);

    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const [selectedIndex, setSelectedIndex] = useState(-1);

    const { mutate: save } = useMutation(addUrl, {
        onSuccess: (data) => {
            setSaveUrlDialog(false);
            router.reload();
        },
        onError: (error) => {
            alert('Error! ');
        }
    });

    const { mutate: update } = useMutation(updateUrl, {
        onSuccess: (data) => {
            router.reload();
        },
        onError: (error) => {
            alert('Error! ');
        }
    });

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const addRowToParams = () => {
        setParams(params => [...params, { 
            key: '',
            value: '',
            description: ''
        }]);
    }

    const removeRowToParams = index => {
         let arr = [...params];
         arr.splice(index, 1);
         setParams(arr);
    }

    const handleParam = (pos, key, value) => {
        let upd = [...params];
        let item = upd[pos];
        item[key] = value;
        upd[pos] = item;
        setParams(upd);
    }

    const addRowToFormData = () => {
        setFormData(formData => [...formData, { 
            key: '',
            value: '',
            description: ''
        }]);
    }

    const removeRowToFormData = index => {
        let arr = [...formData];
        arr.splice(index, 1);
        setFormData(arr);
   }

   const handleFormData = (pos, key, value) => {
    let upd = [...formData];
    let item = upd[pos];
    item[key] = value;
    upd[pos] = item;
    setFormData(upd);
}


const addRowToHeaders = () => {
    setHeaders(headers => [...headers, { 
        key: '',
        value: '',
        description: ''
    }]);
}

const removeRowToHeaders = index => {
    let arr = [...headers];
    arr.splice(index, 1);
    setHeaders(arr);
}

const handleHeaders = (pos, key, value) => {
let upd = [...headers];
let item = upd[pos];
item[key] = value;
upd[pos] = item;
setHeaders(upd);
}

    useEffect(() => {
        if(test){
            setSelectedMethod(test.method);
            setUrl(test.url)
            setExpect(test.expect);
            setSelectedIndex(options.findIndex(d=>d===test.typeTest));
            setResponse(test.response || '');
            setStatusRequest(test.status);
            setParams(test.params.length>0 ? test.params : [{
                key: '',
                value: '',
                description: ''
            }]);
            setHeaders(test.params.headers>0 ? test.headers : [{
                key: '',
                value: '',
                description: ''
            }]);
            setFormData(test.bodyForm.length>0 ? test.bodyForm : [{
                key: '',
                value: '',
                description: ''
            }]);
            setRaw(test.bodyRaw);
        }
        
        return () => {
            setSelectedMethod('');
            setUrl('');
            setExpect('');
            setSelectedIndex(-1);
            setResponse('');
            setStatusRequest(0);
            setParams({
                key: '',
                value: '',
                description: ''
            });
            setHeaders({
                key: '',
                value: '',
                description: ''
            });
            setRaw('');
            setFormData({
                key: '',
                value: '',
                description: ''
            })
        };
    }, [test]);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleMethod = value => setSelectedMethod(value);

    const send = async () => {
        if(url){
            let headersRequest = getHeaders(headers);
            switch (selectedMethod) {
                case methods[0]:
                    let parameters = getParameters(params);
                    let getResponse = await customget(url + parameters, headersRequest);
                    setResponse(JSON.stringify(getResponse.data));
                    setStatusRequest(getResponse.status);
                    break;
                case methods[1]:
                    let bodyPost = bodyTab === 'form-data' ? getFormData(formData) : raw;
                    let postResponse = await custompost(url, bodyPost, headersRequest);
                    setResponse(JSON.stringify(postResponse.data));
                    setStatusRequest(postResponse.status);
                    break;
                case methods[2]:
                    let bodyPut = bodyTab === 'form-data' ? getFormData(formData) : raw;
                    let putResponse = await customput(url, bodyPut, headersRequest);
                    setResponse(JSON.stringify(putResponse.data));
                    setStatusRequest(putResponse.status);
                    break;
                case methods[3]:
                    let delResponse = await customdelete(url, headersRequest);
                    setResponse(JSON.stringify(delResponse.data));
                    setStatusRequest(delResponse.status);
                    break;
                default:
                    let defparameters = getParameters(params);
                    let defaultResponse = await customget(url + defparameters, headersRequest);
                    setResponse(JSON.stringify(defaultResponse.data));
                    setStatusRequest(defaultResponse.status);
                    break;
            }
        }
        
    }

    const runTest = () => {
        if (selectedIndex === -1 || !expect) {
            setTestResult({ type: 'error', message: 'Seleccione un tipo y el valor esperado para esta prueba.' })
        }
        else {
            switch (options[selectedIndex]) {
                case options[0]:
                    verifyEqual();
                    break;
                case options[1]:
                    verifyContains();
                    break;
                case options[2]:
                    verifyStatus();
                    break;
            }
        }
    }

    function verifyStatus() {
        if(parseFloat(expect) === parseFloat(statusRequest)){
            setTestResult({type: 'success', message: 'La prueba fue satisfactoria.'});
        }
        else{
            setTestResult({type: 'error', message: 'La prueba ha fallado.'});
        }
    }

    function verifyContains() {
        if(String(response).includes(expect)){
            setTestResult({type: 'success', message: 'La prueba fue satisfactoria.'});
        }
        else{
            setTestResult({type: 'error', message: 'La prueba ha fallado.'});
        }
    }

    function verifyEqual() {
        if(response === expect){
            setTestResult({type: 'success', message: 'La prueba fue satisfactoria.'});
        }
        else{
            setTestResult({type: 'error', message: 'La prueba ha fallado.'});
        }
    }

    const closeAlert = () => {
        setTestResult({...testResult, message: ''})
    }

    const openDialogSaveUrl = () => {
        if(test){
            update({
                id: test._id,
                data: {
                    description: test.description,
                    url: url,
                    method: selectedMethod,
                    typeTest: options[selectedIndex],
                    expect: expect,
                    response: response,
                    status: statusRequest,
                    params: params,
                    headers: headers,
                    bodyRaw: raw,
                    bodyForm: formData
                }
            });
        }
        else{
            setSaveUrlDialog(true);
        } 
    }

    const saveUrl = values => {
        save({
            appId: values.app,
            data: {
                description: values.description,
                url: url,
                method: selectedMethod,
                typeTest: options[selectedIndex],
                expect: expect,
                response: response,
                status: statusRequest,
                params: params,
                headers: headers,
                bodyRaw: raw,
                bodyForm: formData
            }
        });
    }

    const goToNewTest = () => router.push('/');


    return (
        <Grid container spacing={3}>
            {
                test &&
                <Grid xs={12}>
                    <Grid container justifyContent={'space-between'} pl={3} pt={2}>
                        <Typography variant='h5'>{test.description}</Typography>
                        <Button variant='contained' onClick={goToNewTest}>{'Nueva prueba'}</Button>
                    </Grid>
                </Grid>
            }
            <Grid xs={12} md={3} pt={3} item>
                <Paper elevation={3} p={1}>
                    <Aside apps={apps} />
                </Paper>
            </Grid>
            <Grid xs={12} md={9} item>
                <Grid container spacing={2}>
                    <Grid item xs={9} sx={{zIndex: 9}}>
                        <Search url={url} onChange={handleUrl} methods={methods} selectedMethod={selectedMethod} handleMethod={handleMethod} />
                    </Grid>
                    <Grid item xs={3}>
                        <Stack direction={'row'} justifyContent={'flex-end'} spacing={2} sx={{ paddingTop: '2px' }}>
                            <Button variant='contained' onClick={send}>{'Enviar'}</Button>
                            <Button variant='contained' onClick={openDialogSaveUrl}>{'Guardar'}</Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={currentTab} onChange={handleTabChange}>
                                <Tab label="Parámetros" {...a11yProps(0)} />
                                {/* <Tab label="Authorization" {...a11yProps(1)} /> */}
                                <Tab label="Encabezados" {...a11yProps(1)} />
                                <Tab label="Cuerpo" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        { currentTab === 0 &&  <ParamsTab params={params} addRowToParams={addRowToParams} removeRowToParams={removeRowToParams} handleParam={handleParam} /> } 
                        {/* { currentTab === 1 &&  <AuthorizationTab /> } */}
                        { currentTab === 1 && <HeadersTab headers={headers} addRowToHeaders={addRowToHeaders} removeRowToHeaders={removeRowToHeaders} handleHeaders={handleHeaders} /> }
                        { currentTab === 2 && <BodyTab raw={raw} handleRaw={handleRaw} tab={bodyTab} handleTab={handleBodyTab} formData={formData} addRowToFormData={addRowToFormData} removeRowToFormData={removeRowToFormData} handleFormData={handleFormData} /> }
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='overline'>{'Prueba'}</Typography>
                       { testResult.message && <Alert severity={testResult.type} onClose={closeAlert}>{testResult.message}</Alert>} 
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
                                {options[selectedIndex] || 'Tipo'}
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
                            <TextField variant='outlined' value={expect} onChange={handleExpect} size='small' fullWidth label={'Valor esperado'} />
                            <Button variant='contained' onClick={runTest}>{'Chequear'}</Button>
                        </Stack>
                    </Grid>
                    <Grid xs={12} item>
                        <TextareaAutosize value={response} placeholder="Respuesta" minRows={7} disabled style={{width: '100%'}} />                                    
                    </Grid>
                </Grid>
            </Grid>

            <SaveUrlTestDialog open={saveUrlDialog} close={()=>setSaveUrlDialog(false)} save={saveUrl} apps={apps} />
        </Grid>
    );
};

export default AutomaticTestsContainer;