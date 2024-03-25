import React, {useEffect, useState} from "react";
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import axios from "axios";
import {useMatch, useNavigate} from "react-router-dom";

export const UserProfile = (props) => {
    const {
        isCurrentUser
    } = props;
    const navigate = useNavigate();

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('authToken');

    const matchUserId = useMatch('/user/:userId');
    const urlUserId = matchUserId?.params?.userId;

    const [isEditMode, setIsEditMode] = useState(false)
    const [user, setUser] = useState({})

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        axios.get(`/api/user/${isCurrentUser ? userId : urlUserId }`, config)
            .then(response => {
                setUser(response.data.user);
            })
            .catch(error => {
                navigate('/');
                console.log('error', error)
            })
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: 2
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Box>
                    <img
                        src={'https://via.placeholder.com/150'}
                        alt={'user avatar'}
                    />
                </Box>
                <Button variant={'outlined'}>Change Avatar</Button>
            </Box>
            <Box
                sx={{
                    width: '100%',
                }}
            >
                {isEditMode ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 2,
                            }}
                        >
                            <TextField
                                error={false}
                                id="outlined-error"
                                label="Name"
                                defaultValue={user.name}
                            />
                            <TextField
                                error={false}
                                id="outlined-error"
                                label="Second Name"
                                defaultValue={user.secondName}
                            />
                            <TextField
                                error={false}
                                id="outlined-error"
                                label="Surname"
                                defaultValue={user.surname}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <Box>
                                <TextField
                                    error={false}
                                    id="outlined-error"
                                    label="Email"
                                    defaultValue={user.email}
                                />
                            </Box>
                            {/*<Box>*/}
                            {/*    <TextField*/}
                            {/*        error={false}*/}
                            {/*        id="outlined-error"*/}
                            {/*        label="Company Name"*/}
                            {/*        defaultValue={user.companyName}*/}
                            {/*    />*/}
                            {/*</Box>*/}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                gap: 2,
                            }}
                        >
                            <Button onClick={() => setIsEditMode(false)} color={'error'} variant={'contained'}>Відміна</Button>
                            <Button onClick={() => setIsEditMode(false)} color={'success'} variant={'contained'}>Зберегти</Button>
                        </Box>
                    </Box>
                ) : (
                    user && (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                width: '100%',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography variant={'h4'}>
                                    {`${user?.surname ?? ''} ${user.name ?? ''} ${user?.secondName ?? ''}`}
                                </Typography>
                                <Button variant={'outlined'} onClick={() => setIsEditMode(true)}>Edit</Button>
                            </Box>
                            <Grid container>
                                <Grid item xs={4} p={1} bgcolor={'#ebebeb'}>
                                    <Typography color={'#626262'}>
                                        Електронна пошта
                                    </Typography>
                                </Grid>
                                <Grid item xs={8} p={1} bgcolor={'#ebebeb'}>
                                    <Typography>
                                        {user.email}
                                    </Typography>
                                </Grid>
                                {/*<Grid item xs={4} p={1}>*/}
                                {/*    <Typography color={'#626262'}>*/}
                                {/*        Компанія*/}
                                {/*    </Typography>*/}
                                {/*</Grid>*/}
                                {/*<Grid item xs={8} p={1}>*/}
                                {/*    <Typography>*/}
                                {/*        {user.companyName}*/}
                                {/*    </Typography>*/}
                                {/*</Grid>*/}
                            </Grid>
                        </Box>
                    )
                )}
            </Box>
        </Box>
    )
}
