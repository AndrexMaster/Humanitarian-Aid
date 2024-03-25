import React, {useState} from "react";
import {ProductItem} from "./UI/ProductItem.jsx";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
} from "@mui/material";
import {Masonry} from "@mui/lab";
import {ProductForm} from "../Product/UI/ProductForm";

export const ProductList = (props) => {
    const {products, category} = props
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [productToOrder, setProductToOrder] = useState({})

    const handleOrder = () => {
        setIsOpenDialog(false)
    }

    return (
        <Box>
            <Masonry columns={4} spacing={2}>
                {products.map((product, index) => (
                    <ProductItem
                        key={index}
                        category={category ?? {}}
                        setIsOpenDialog={setIsOpenDialog}
                        product={product}
                        setProductToOrder={setProductToOrder}
                    />
                ))}
            </Masonry>
            {productToOrder.id && (
                <Dialog
                    open={isOpenDialog}
                    onClose={() => setIsOpenDialog(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <Typography variant={'h4'}>
                            Нове замовлення
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <ProductForm product={productToOrder}/>
                    </DialogContent>
                    <DialogActions
                        sx={{
                            justifyContent: 'flex-start'
                        }}
                    >
                        <Button onClick={() => setIsOpenDialog(false)}>Закрити</Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    )
}
