import { Box, FormControl, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import logoVinculacion from '../../assets/logoVinculacion.svg';
import  {Toaster, toast }  from 'sonner';


const PreLogin = () => {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const invitado = sessionStorage.getItem('invitado');



    const handleUser = (e) => {
        setUser(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }


    const handleLogin = () => {
        if (user === import.meta.env.VITE_USER && password === import.meta.env.VITE_PASSWORD) {
            sessionStorage.setItem('invitado', true)
            toast.success('Te has logueado correctamente');
            setTimeout(() => {
                window.location.href = '/home';
            }, 2000);
        }
        else {
            toast.error('Usuario o contraseña incorrectos');}
    }

    const handleLogout = () => {
        sessionStorage.removeItem('invitado');
        window.location.reload()
    }


   

    return ( 
        <>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f4f4f4'
        }}>
            {
                !invitado ? (
                <>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    justifyContent: 'center',
                    padding: '40px',
                    maxWidth: '380px',
                    
                }}>
                    <img src={logoVinculacion} alt="Logo Vinculación" style={{ 
                        width: '200px',
                        height: '200px',
                        marginBottom: '20px'
                     }} />
                     
                    <Box sx={{ 
                        padding: '1rem 1rem',
                        backgroundColor: '#fff3cd',
                        border : '1px solid transparent',
                        borderRadius: '.25rem',
                        borderColor: '#ffecb5',
                     }}>
                        <Typography 
                            variant="h4" 
                            align='center' 
                            sx={{
                                color: "#664d03",
                                fontSize: '1rem',
                                fontWeight: 400,
                                lineHeight: 1.5,
                                fontFamily: 'Roboto, sans-serif'

                            }} >
                            Para acceder primero debes loguearte.
                        </Typography>
                    </Box>
                        <TextField
                            label="Usuario"
                            variant="outlined"
                            onChange={handleUser}
                            width="330px" 
                            fullWidth
                            sx={{
                                backgroundColor: '#fff',
                            }}
                        />
                    
                        <TextField
                            label="Contraseña"
                            variant="outlined"
                            type="password"
                            onChange={handlePassword}
                            fullWidth 
                            sx={{
                                backgroundColor: '#fff',
                            }}
                        />
                    <Button
                        variant="contained"
                        onClick={handleLogin}
                        fullWidth
                        sx={{
                            backgroundColor: '#57A42D',
                            fontWeight: 400,
                            lineHeight: 1.5,
                            display: 'inline-block',
                            textAlign: 'center',
                            verticalAlign: 'middle',
                            border: '1px solid transparent',
                        }}
                    >
                        Ingresar
                    </Button>
                    
                </Box>
            </>) : (<Box>
                <h2>Ya estás logueado</h2>
                <Button
                    variant="contained"
                    onClick={handleLogout}
                    
                    
                >
                    Cerrar sesión
                </Button>
            </Box>)
            }
             </Box>   
             <Toaster richColors />
        </>
     );
}
 
export default PreLogin;