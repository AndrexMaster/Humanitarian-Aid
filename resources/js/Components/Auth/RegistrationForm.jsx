import React, {useState} from "react";
import {Box, Button, TextField} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {setUser, setUserId} from "@/Storage/Redux/Auth/authSlice.js";
import {useDispatch} from "react-redux";

export const RegistrationForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [userNameError, setUserNameError] = useState('');

    const [userSecondName, setUserSecondName] = useState('');
    const [userSecondNameError, setUserSecondNameError] = useState('');

    const [userLastName, setUserLastName] = useState('');
    const [userLastNameError, setUserLastNameError] = useState('');

    const [companyName, setCompanyName] = useState('');
    const [companyNameError, setCompanyNameError] = useState('');

    const [userEmail, setUserEmail] = useState('');
    const [userEmailError, setUserEmailError] = useState('');

    const [userPassword, setUserPassword] = useState('');
    const [userPasswordError, setUserPasswordError] = useState('');

    const [userPasswordConfirmation, setUserPasswordConfirmation] = useState('');
    const [userPasswordConfirmationError, setUserPasswordConfirmationError] = useState('');

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const textRegex = /^[A-Za-zА-яЁёІі]{2,}$/;


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

    const handleUserLastNameChange = (e) => {
        const newLastName = e.target.value;
        setUserLastName(newLastName);

        if (!textRegex.test(newLastName)) {
            setUserLastNameError('По-батькові повинно містити тільки символи кирилиці або латини та бути довжиною від 2 символів');
        } else {
            setUserLastNameError('');
        }
    };

    const handleCompanyNameChange = (e) => {
        const newCompanyName = e.target.value;
        setCompanyName(newCompanyName);
    };

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
        setUserPassword(newPassword);

        // Проверяем соответствие пароля регулярному выражению
        if (!passRegex.test(newPassword)) {
            setUserPasswordError('Пароль повинен містити від 8 до 16 символів і включати хоча б одну букву верхнього і нижнього регістрів та одну цифру.');
        } else {
            setUserPasswordError('');
        }
    };

    const handlePasswordConfirmationChange = (e) => {
        const newPassConfirmation = e.target.value;
        setUserPasswordConfirmation(newPassConfirmation);

        if (userPassword !== newPassConfirmation) {
            setUserPasswordConfirmationError('Паролі не співпадають');
        } else {
            setUserPasswordConfirmationError('');
        }
    };

    const validateForm = () => {
        let isValid = true;

        if (!textRegex.test(userName)) {
            setUserNameError('Ім\'я повинно містити тільки символи кирилиці або латини та бути довжиною від 3 символів');
            isValid = false;
        }

        if (!textRegex.test(userSecondName)) {
            setUserSecondNameError('Прізвище повинно містити тільки символи кирилиці або латини та бути довжиною від 3 символів');
            isValid = false;
        }

        if (!textRegex.test(userLastName)) {
            setUserLastNameError('По-батькові повинно містити тільки символи кирилиці або латини та бути довжиною від 3 символів');
            isValid = false;
        }

        if (!emailRegex.test(userEmail)) {
            setUserEmailError('Некоректний формат електронної пошти.');
            isValid = false;
        }

        if (!passRegex.test(userPassword)) {
            setUserPasswordError('Пароль повинен містити від 8 до 16 символів і включати хоча б одну букву верхнього і нижнього регістрів та одну цифру.');
            isValid = false;
        }

        if (userPassword !== userPasswordConfirmation) {
            setUserPasswordConfirmationError('Паролі не співпадають');
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
            const response = await axios.post('api/auth/register', {
                name: userName,
                second_name: userSecondName,
                surname: userLastName,
                company_name: companyName,
                email: userEmail,
                password: userPassword,
                password_confirmation: userPasswordConfirmation
            });

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
                navigate('/')
            } catch (error) {
                if (error.response) {
                    // Якщо відповідь з сервера містить статус помилки
                    console.error('Registration failed', error.response.data);
                } else {
                    // Якщо помилка з'являється без відповіді від сервера
                    console.error('Registration failed', error.message);
                }
            }

            console.log('Registration successful', response.data);
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
                py: 2
            }}
        >
            <TextField
                required
                id="surname_field"
                label="Прізвище"
                onChange={(e) => handleUserLastNameChange(e)}
                error={!!userLastNameError}
                helperText={userLastNameError}
                name={'surname'}
            />
            <TextField
                required
                id="name_field"
                label="Ім'я"
                onChange={(e) => handleUserNameChange(e)}
                error={!!userNameError}
                helperText={userNameError}
                name={'name'}
            />
            <TextField
                required
                id="second_name_field"
                label="По-батькові"
                onChange={(e) => handleUserSecondNameChange(e)}
                error={!!userSecondNameError}
                helperText={userSecondNameError}
                name={'second_name'}
            />
            <TextField
                id="company_name_field"
                label="Назва компанії"
                onChange={(e) => handleCompanyNameChange(e)}
                error={!!companyNameError}
                helperText={companyNameError}
                name={'company_name'}
            />
            <TextField
                required
                id="email_field"
                label="Електронна пошта"
                onChange={(e) => handleEmailChange(e)}
                error={!!userEmailError}
                helperText={userEmailError}
                name={'email'}
            />
            <TextField
                required
                id="password_field"
                label="Пароль"
                onChange={(e) => handlePasswordChange(e)}
                error={!!userPasswordError}
                helperText={userPasswordError}
                name={'password'}
                type={'password'}
            />
            <TextField
                required
                id="password_confirmation_field"
                label="Підтвердження пароля"
                onChange={(e) => handlePasswordConfirmationChange(e)}
                error={!!userPasswordConfirmationError}
                helperText={userPasswordConfirmationError}
                name={'password_confirmation'}
                type={'password'}
            />
            <Button
                variant={'contained'}
                color={'primary'}
                onClick={(e) => handleSubmit(e)}
                type={'submit'}
            >
                Зареєструватися
            </Button>
        </Box>
    )
}
