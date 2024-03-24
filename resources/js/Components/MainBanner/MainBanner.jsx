import React, {useEffect, useState} from 'react';
import {Box, Button, Chip, Container, Divider, Typography, useTheme} from "@mui/material";
import {LoginForm} from "../Auth/LoginForm.jsx";
import axios from "axios";

export const MainBanner = () => {
    const authToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    const [user, setUser] = useState({})
    const theme = useTheme()

    useEffect(() => {
        if (userId === null) return;
        const config = {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        };

        axios.get(`/api/user/${userId}`, config)
            .then(response => {
                setUser(response.data.user);
            })
            .catch(error => {
                console.log('error', error)
            })
    }, [userId, authToken]);


    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                boxSizing: 'border-box',
                backgroundImage: 'url(/assets/main-banner.png)',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                    backgroundColor: '#00000090',
                }}
            >
                <Container>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr auto 1fr',
                            minHeight: '50vh',
                            minWidth: '50vw',
                            backgroundColor: theme.palette.background.default,
                            borderRadius: '20px',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                p: 3,
                                gap: 3
                            }}
                        >
                            <Typography variant={'h4'}>
                                Разом ми сила!
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flex: 1,
                                    maxHeight: '100%',
                                    overflow: 'auto',
                                }}
                            >
                                <Typography
                                    align="center"
                                    gutterBottom
                                >
                                    Приєднуйтесь до нашої спільноти, щоб надавати гуманітарну допомогу тим, хто її найбільше потребує. Зареєструйтеся зараз та долучайтеся до нашої ініціативи, де ви зможете безкоштовно віддати ті речі, які можуть допомогти іншим. Кожен ваш внесок має велике значення. Давайте разом допомагати тим, хто в цьому найбільше потребує!
                                </Typography>
                            </Box>
                        </Box>
                        <Divider orientation="vertical" variant="middle" flexItem sx={{my: '50px'}}/>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: user === {} || userId === null ? 'flex-start' : 'space-between',
                                boxSizing: 'border-box',
                                width: '100%',
                                height: '100%',
                                p: 3,
                            }}
                        >
                            <Typography variant={'h4'}>
                                {user === {} || userId === null ?
                                    'Увійти до аккаунту'
                                :
                                    `Вітаємо, ${user?.name ?? ''} ${user?.secondName ?? ''} ${user?.surname ?? ''} !`
                                }
                            </Typography>
                            {user === {} || userId === null && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flex: 1
                                    }}
                                >
                                    <Box
                                        component={'img'}
                                        src={'/assets/logo.png'}
                                        sx={{height: '80px', width: '80px'}}
                                    />
                                </Box>
                            )}
                            <Box
                                sx={{
                                    width: '100%',
                                    display: user === {} || userId === null ? 'block' : 'flex',
                                    alignItems: 'center',
                                    flex: user === {} || userId === null ? 1 : 0,
                                }}
                            >
                                {user === {} || userId === null ? (
                                    <>
                                      <LoginForm formStyles={{py: 0, width: '100%',}}/>
                                      <Divider
                                          sx={{
                                              py: 1
                                          }}
                                      >
                                          <Chip label="Або" size="small" />
                                      </Divider>
                                      <Button sx={{width: '100%'}} variant={'contained'} onClick={() => navigate('/auth')}>
                                          Реєстрація - важливий крок
                                      </Button>
                                    </>
                                ) : (
                                    <Typography>
                                        Ласкаво просимо до спільноти добра! Ваш внесок надихне інших на допомогу тим, хто цього потребує. Разом ми здатні зробити значний крок у полегшенні страждань тих, хто опинився у скрутному становищі. Дякуємо за вашу участь!
                                    </Typography>
                                )}
                            </Box>
                            {user === {} || userId === null ?
                                null
                            : (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Box
                                        component={'img'}
                                        src={'/assets/logo.png'}
                                        sx={{height: '80px', width: '80px'}}
                                    />
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}
