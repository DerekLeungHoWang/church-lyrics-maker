import { Grid,Button, Container, Modal, Paper } from '@material-ui/core'
import React, { useState } from 'react'

export default function ImageUploader() {
    const [open, setOpen] = useState(false)


    const handleClose = () => {
        setOpen(false)
    }
    return (
        <Container>
            <Button onClick={() => setOpen(!open)}>Upload an image</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Container maxWidth={false} >
                    <Paper style={{ maxWidth: "80%", maxHeight: "80%", top:"50%",left:"50%" }}>
                        Hello
                    </Paper>
                </Container>
            </Modal>
        </Container>

    )
}
