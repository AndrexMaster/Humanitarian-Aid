import React, {useState} from "react";
import {ProductItem} from "./UI/ProductItem.jsx";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {Masonry} from "@mui/lab";

export const ProductList = ({products}) => {
    const [isOpenDialog, setIsOpenDialog] = useState(false)

    const handleOrder = () => {
        setIsOpenDialog(false)
    }

    return (
        <Box>
            <Masonry columns={4} spacing={2}>
                {products.map((product, index) => (
                    <ProductItem key={index} setIsOpenDialog={setIsOpenDialog} product={product}/>
                ))}
            </Masonry>
            <Dialog
                open={isOpenDialog}
                onClose={() => setIsOpenDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsOpenDialog(false)}>Закрити</Button>
                    <Button onClick={handleOrder} autoFocus>
                        Замовити
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
