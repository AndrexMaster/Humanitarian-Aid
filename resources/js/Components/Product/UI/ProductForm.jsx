import React, {useState} from 'react';
import {Box, Button, Divider, TextField, Typography} from "@mui/material";

export const ProductForm = ({product}) => {

    const [userNameError, setUserNameError] = useState()
    const [userPhoneError, setUserPhoneError] = useState()
    const [userCommentError, setUserCommentError] = useState()

    const handleNameChange = () => {

    }


    const  handlePhoneChange = () => {

    }


    const  handleCommentChange = () => {

    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant={'h5'}>{product.name}</Typography>
            </Box>
            <Divider/>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    gap: 2,
                    pt: 3,
                    height: '100%',
                }}
            >
                <Box>
                    <Typography variant={'h6'}>Замовляйте зараз!</Typography>
                </Box>
                <TextField
                    required
                    id="name"
                    label="Ім'я"
                    error={!!userNameError}
                    helperText={userNameError}
                    onChange={(e) => handleNameChange(e)}
                    name={'name'}
                />
                <TextField
                    required
                    id="phone"
                    label="Телефон"
                    error={!!userPhoneError}
                    helperText={userPhoneError}
                    onChange={(e) => handlePhoneChange(e)}
                    name={'name'}
                />
                <TextField
                    required
                    id="comment"
                    label="Коментар"
                    error={!!userCommentError}
                    helperText={userCommentError}
                    onChange={(e) => handleCommentChange(e)}
                    name={'comment'}
                />
                <Button
                    variant={'contained'}
                >
                    Замовити
                </Button>
            </Box>
        </Box>
    )
}
