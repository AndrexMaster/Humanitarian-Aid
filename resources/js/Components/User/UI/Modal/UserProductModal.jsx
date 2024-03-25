import React, {useEffect, useRef, useState} from "react";
import {
    Autocomplete,
    Box,
    Button, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
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
    const [open, setOpen] = React.useState(false);

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [fullDescription, setFullDescription] = useState('')
    const [mediaFile, setMediaFile] = useState(null)
    const [categories, setCategories] = useState([])
    const [currentCategory, setCurrentCategory] = useState('')


    useEffect(() => {
        axios.get('/api/categories').then(response => {
            setCategories(response.data.categories);
        });
    }, []);

    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        full_description: '',
        image_src: '',
        mediaFile: '',
        category: {
            id: '',
            name: '',
        }
    });

    useEffect(() => {
        setNewProduct(prevState => ({
            ...prevState,
            name: name,
            description: description,
            full_description: fullDescription,
        }));
    }, [name, description, fullDescription]);

    const handleCategoryAdd = (event, value) => {
        setCurrentCategory(value);
        setNewProduct(prevState => ({
            ...prevState,
            category: {
                id: value.id,
                name: value.name,
            }
        }));
    }

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        const filePath = URL.createObjectURL(selectedFile);

        setNewProduct(prevState => ({
            ...prevState,
            image_src: filePath,
            mediaFile: selectedFile
        }));

        setMediaFile(selectedFile);
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();

        if (
            name.length < 3 ||
            description.length < 3 ||
            !mediaFile ||
            currentCategory === ''

        ) {
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('fullDescription', fullDescription);
        formData.append('mediaFile', mediaFile);
        formData.append('categoryId', currentCategory.id);

        try {
            const response = await axios.post('/api/products/addProduct', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            setUserProducts(prevProducts => [...prevProducts, response.data.product]);
            console.log('Registration successful', response.data);
            setIsOpenDialog(false)
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
            maxWidth={"md"}
            fullWidth={true}
        >
            <DialogTitle id="alert-dialog-title">
                Створення нового продукту
            </DialogTitle>
            <DialogContent>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr auto 1fr',
                        gap: 3,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            py: 2,
                            width: '100%'
                        }}
                    >
                        <ProductItem
                            isPreview={true}
                            product={newProduct}
                            sx={{
                                flex: 1
                            }}
                        />
                    </Box>
                    <Divider orientation="vertical" sx={{height: 'auto', my: '10px'}}/>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                            width: '100%',
                        }}
                    >
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
                        <Autocomplete
                            id="categories"
                            sx={{ width: '100%' }}
                            open={open}
                            onOpen={() => setOpen(true)}
                            onClose={() => setOpen(false)}
                            onChange={handleCategoryAdd}
                            isOptionEqualToValue={(option, value) => option.id === value.id} // Изменено на соответствующее поле идентификатора
                            getOptionLabel={(option) => option.name} // Изменено на соответствующее поле имени категории
                            options={categories}
                            loading={categories.length === 0}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Виберіть категорію"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <React.Fragment>
                                                {categories.length === 0 ? <CircularProgress color="inherit" size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            gridColumnStart: 1,
                            gridColumnEnd: 4
                        }}
                    >
                        <TextField
                            id="full-description"
                            label="Повний опис товару"
                            placeholder="Повний опис товару"
                            onChange={(e) => setFullDescription(e.target.value)}
                            multiline
                            sx={{
                                flex: 1
                            }}
                        />
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
