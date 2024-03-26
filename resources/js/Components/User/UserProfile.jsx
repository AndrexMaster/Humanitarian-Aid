import React, {useEffect, useState} from "react";
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import axios from "axios";
import {useMatch, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export const UserProfile = (props) => {
    const {
        isCurrentUser
    } = props;
    const navigate = useNavigate();

    const userToken = useSelector(state => state.user.userToken);
    const userId = useSelector(state => state.user.userId);


    const matchUserId = useMatch('/user/:userId');
    const urlUserId = matchUserId?.params?.userId;

    const [isEditMode, setIsEditMode] = useState(false)
    const [user, setUser] = useState({})

    const [userName, setUserName] = useState('')
    const [userNameError, setUserNameError] = useState()
    const [userSurname, setUserSurname] = useState('')
    const [userSurnameError, setUserSurnameError] = useState()
    const [userSecondName, setUserSecondName] = useState('')
    const [userSecondNameError, setUserSecondNameError] = useState()
    const [userEmail, setUserEmail] = useState('')
    const [userEmailError, setUserEmailError] = useState()

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const textRegex = /^[A-Za-zА-яЁёІі]{2,}$/;

    useEffect(() => {
        setUserName(user.name)
        setUserSurname(user.surname)
        setUserSecondName(user.second_name)
        setUserEmail(user.email)
    }, [user]);

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': `Bearer ${userToken}`
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

    const handleUserNameChange = (e) => {
        const newName = e.target.value;
        setUserName(newName);

        if (!textRegex.test(newName)) {
            setUserNameError('Ім\'я повинно містити тільки символи кирилиці або латини та бути довжиною від 2 символів та не містити пробілів');
        } else {
            setUserNameError('');
        }
    };

    const handleUserSecondNameChange = (e) => {
        const newSecondName = e.target.value;
        setUserSecondName(newSecondName);

        if (!textRegex.test(newSecondName)) {
            setUserSecondNameError('Прізвище повинно містити тільки символи кирилиці або латини та бути довжиною від 2 символів');
        } else {
            setUserSecondNameError('');
        }
    };

    const handleUserSurnameChange = (e) => {
        const newSurname = e.target.value;
        setUserSurname(newSurname);

        if (!textRegex.test(newSurname)) {
            setUserSurnameError('По-батькові повинно містити тільки символи кирилиці або латини та бути довжиною від 2 символів');
        } else {
            setUserSurnameError('');
        }
    };

    const handleUserEmailChange = (e) => {
        const newEmail = e.target.value;
        setUserEmail(newEmail);

        if (!emailRegex.test(newEmail)) {
            setUserEmailError('Некоректний формат електронної пошти');
        } else {
            setUserEmailError('');
        }
    };


    const userUpdateMiddleware = () => {
        let isValid = true

        if (!textRegex.test(userName)) {
            setUserNameError('Ім\'я повинно містити тільки символи кирилиці або латини та бути довжиною від 3 символів');
            isValid = false;
        }

        if (!textRegex.test(userSecondName)) {
            setUserSecondNameError('Прізвище повинно містити тільки символи кирилиці або латини та бути довжиною від 3 символів');
            isValid = false;
        }

        if (!textRegex.test(userSurname)) {
            setUserSurnameError('По-батькові повинно містити тільки символи кирилиці або латини та бути довжиною від 3 символів');
            isValid = false;
        }

        if (!emailRegex.test(userEmail)) {
            setUserEmailError('Некоректний формат електронної пошти.');
            isValid = false;
        }

        return isValid;
    }

    const updateUser = async () => {
        if (!userUpdateMiddleware()) {
            return;
        }

            const formData = new FormData();
            formData.append('name', userName);
            formData.append('second_name', userSecondName);
            formData.append('surname', userSurname);
            formData.append('email', userEmail);

        try {
            const response = await axios.post('/api/user/update', formData, {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            setUser(response.data.user)
            setIsEditMode(false)
        } catch (error) {
            if (error.response) {
                // Якщо відповідь з сервера містить статус помилки
                console.error('Registration failed', error.response.data);
            } else {
                // Якщо помилка з'являється без відповіді від сервера
                console.error('Registration failed', error.message);
            }
        }

    }

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
                                error={!!userSurnameError}
                                helperText={userSurnameError}
                                onChange={handleUserSurnameChange}
                                id="user-surname"
                                label="Прізвище"
                                defaultValue={user.surname}
                            />
                            <TextField
                                error={!!userNameError}
                                helperText={userNameError}
                                onChange={handleUserNameChange}
                                id="user-name"
                                label="Ім'я"
                                defaultValue={user.name}
                            />
                            <TextField
                                error={!!userSecondNameError}
                                helperText={userSecondNameError}
                                onChange={handleUserSecondNameChange}
                                id="user-name"
                                label="По батькові"
                                defaultValue={user.second_name}
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
                                    error={!!userEmailError}
                                    helperText={userEmailError}
                                    onChange={handleUserEmailChange}
                                    id="user-email"
                                    label="Почта"
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
                            <Button onClick={() => updateUser()} color={'success'} variant={'contained'}>Зберегти</Button>
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
                                    {`${user?.surname ?? ''} ${user.name ?? ''} ${user?.second_name ?? ''}`}
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
