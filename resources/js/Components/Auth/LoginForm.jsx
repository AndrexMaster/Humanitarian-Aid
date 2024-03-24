import React, {useState} from "react";
import {Box, Button, TextField} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser, setUserId} from "../../Storage/Redux/Auth/authSlice.js";

export const LoginForm = (props) => {
    const {
        formStyles
    } = props

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userEmail, setUserEmail] = useState('');
    const [userEmailError, setUserEmailError] = useState('');

    const [userPassword, setUserPassword] = useState('');
    const [userPasswordError, setUserPasswordError] = useState('');

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setUserEmail(newEmail);

        // Проверяем соответствие пароля регулярному выражению
        if (!emailRegex.test(newEmail)) {
            setUserEmailError('Некоректний формат електронної пошти.');
        } else {
            setUserEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;

        if (newPassword && newPassword.length > 7 && newPassword.length < 17) {
            setUserPassword(newPassword)
            setUserPasswordError('')
        } else {
            setUserPasswordError('Це поле обов\'язкове для заповнення та має містити від 8 до 16 символів')
        }

    }

    const validateForm = () => {
        let isValid = true;

        if (!emailRegex.test(userEmail)) {
            setUserEmailError('Некоректний формат електронної пошти.');
            isValid = false;
        }

        if (!userPassword || userPassword.length < 8 || userPassword.length > 16) {
            setUserPasswordError('Це поле обов\'язкове для заповнення та має містити від 8 до 16 символів');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post('api/auth/login', {
                email: userEmail,
                password: userPassword,
            });
            const authToken = response.data.token;
            const userId = response.data.userId;
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('userId', userId);
            dispatch(setUserId(userId));
            dispatch(setUser(response.data.user));

            navigate('/');
        } catch (error) {
            if (error.response) {
                // Якщо відповідь з сервера містить статус помилки
                console.error('Registration failed', error.response.data);
            } else {
                // Якщо помилка з'являється без відповіді від сервера
                console.error('Registration failed', error.message);
            }
        }
    };


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                py: 2,
                ...formStyles
            }}
        >
            <TextField
                required
                id="email"
                label="Електронна пошта"
                error={!!userEmailError}
                helperText={userEmailError}
                onChange={(e) => handleEmailChange(e)}
                name={'email'}
            />
            <TextField
                required
                id="outlined-required"
                label="Пароль"
                error={!!userPasswordError}
                helperText={userPasswordError}
                onChange={(e) => handlePasswordChange(e)}
                type="password"
                name={'password'}
            />
            <Button
                variant={'contained'}
                color={'primary'}
                onClick={(e) => handleSubmit(e)}
            >
                Увійти
            </Button>
        </Box>
    )
}
