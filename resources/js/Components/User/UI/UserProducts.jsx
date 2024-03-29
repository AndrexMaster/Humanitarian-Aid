import React, {useEffect, useState} from "react";
import axios from "axios";
import {Box, Paper} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {ProductItem} from "../../Products/UI/ProductItem.jsx";
import {UserProductModal} from "../../User/UI/Modal/UserProductModal.jsx";
import {Masonry} from "@mui/lab";
import {useMatch, useNavigate} from "react-router-dom";

export const UserProducts = (props) => {
    const {
        isCurrentUser,
    } = props;
    const navigate = useNavigate();

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('authToken');

    const matchUserTab = useMatch('/user/:userId');
    const urlUserId = matchUserTab?.params?.userId;


    const [userProducts, setUserProducts] = useState({})
    const [isOpenDialog, setIsOpenDialog] = useState(false)

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        axios.get(`/api/user/${isCurrentUser ? userId : urlUserId }/products`, config)
            .then(response => {
                console.log('response', response)
                setUserProducts(response.data.products);
            })
            .catch(error => {
                navigate('/')
                console.log('error', error)
            })
    }, []);

    return (
        <Box>
            <Box>
                <Masonry columns={3} spacing={2}>
                    {userProducts?.length > 0 && userProducts.map((product, index) => (
                        <ProductItem isUserOwner={true} key={index} product={product}/>
                    ))}
                </Masonry>
                <Paper
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: userProducts?.length > 0 ? '100%' : '250px',
                        width: '100%',
                        backgroundColor: '#d9d9d9',
                        transition: '.3s',

                        '&:hover': {
                            cursor: 'pointer',
                            backgroundColor: '#c4c4c4',

                            '& svg' : {
                                color: '#e3e3e3',
                            }
                        }
                    }}
                    onClick={() => setIsOpenDialog(true)}
                >
                    <AddIcon sx={{fontSize: '50px', color: '#aaa', transition: '.3s',}}/>
                </Paper>
            </Box>
            {isOpenDialog && (
                <UserProductModal setUserProducts={setUserProducts} isOpenDialog={isOpenDialog} setIsOpenDialog={setIsOpenDialog}/>
            )}
        </Box>
    )
}
