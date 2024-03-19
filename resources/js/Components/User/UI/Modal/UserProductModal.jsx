import React, {useEffect, useRef, useState} from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Input,
    TextField,
    Typography
} from "@mui/material";
import {ProductItem} from "../../../Products/UI/ProductItem";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";

export const UserProductModal = (props) => {
    const {
        setUserProducts,
        isOpenDialog,
        setIsOpenDialog,
    } = props;

    const inputRef = useRef(null);
    const token = localStorage.getItem('authToken');

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [imageSrc, setImageSrc] = useState('')
    const [mediaFile, setMediaFile] = useState(null)

    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        image_src: '',
        mediaFile: '',
    });

    useEffect(() => {
        setNewProduct(prevState => ({
            ...prevState,
            name: name,
            description: description,
        }));
    }, [name, description]);

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        const filePath = URL.createObjectURL(selectedFile);

        console.log('selectedFile', selectedFile);
        console.log('filePath', filePath);

        setNewProduct(prevState => ({
            ...prevState,
            image_src: filePath,
            mediaFile: selectedFile
        }));

        setMediaFile(selectedFile);
        setImageSrc(filePath);
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();

        if (
            name.length < 3 ||
            description.length < 3 ||
            !mediaFile
        ) {
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('mediaFile', mediaFile);

        try {
            const response = await axios.post('/api/products/addProduct', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            setUserProducts(prevProducts => [...prevProducts, response.data.product]);
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
        <Dialog
            open={isOpenDialog}
            onClose={() => setIsOpenDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Створення нового продукту
            </DialogTitle>
            <DialogContent>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 3,
                        minWidth: '350px',
                    }}
                >
                    <Box sx={{py: 2, width: '100%'}}>
                        <ProductItem product={newProduct}/>
                    </Box>
                    <Divider sx={{width: '100%'}}>
                        <Typography sx={{color: '#aaa'}}>
                            Впишіть данні продукту
                        </Typography>
                    </Divider>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                            width: '100%',
                        }}
                    >
                        <TextField
                            required
                            id="product_name"
                            label="Назва товару"
                            name={'product_name'}
                            onChange={(e) => setName(e.target.value)}
                            sx={{width: '100%'}}
                        />
                        <TextField
                            required
                            id="product_description"
                            label="Опис товару"
                            name={'product_description'}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline
                            maxRows={4}
                            sx={{width: '100%'}}
                        />
                        <Box
                            sx={{width: '100%'}}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                ref={inputRef}
                                style={{display: 'none'}}
                                onChange={handleImageChange}
                            />
                            <Button
                                variant="contained"
                                startIcon={<CloudUploadIcon/>}
                                onClick={() => inputRef.current.click()}
                                sx={{width: '100%'}}
                            >
                                Upload file
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Button
                        color={'error'}
                        variant={'contained'}
                        onClick={() => setIsOpenDialog(false)}

                    >
                        Відміна
                    </Button>
                    <Button
                        color={'success'}
                        variant={'contained'}
                        onClick={handleAddProduct}
                        autoFocus
                    >
                        Опублікувати
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    )
}
