import { Grid, Button, Container, Modal, Paper, makeStyles, Typography, Divider } from '@material-ui/core'
import React, { useState } from 'react'
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',

        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',


    }
}));
function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}
export default function ImageUploader() {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [modalStyle] = useState(getModalStyle);

    const handleClose = () => {
        setOpen(false)
    }
    return (
        <Grid container justifyContent="center" alignItems="center">
            <Button onClick={() => setOpen(!open)}>Upload an image</Button>
            <Modal
                style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',

                }}
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >


                <Paper style={{
                    height: "90%",
                    minWidth: "80%",
                    padding: "15px",

                }} >
                    <Typography variant="h6" >Image Upload</Typography>
                    <Divider style={{width:"100%"}}/>
                </Paper>

            </Modal>
        </Grid>
    )
}
