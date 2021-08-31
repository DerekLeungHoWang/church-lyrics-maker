import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CircularProgress } from '@material-ui/core';

export default function DeleteDialog({ deleteDialog, setDeleteDialog, handleConfirm }) {
    // const [open, setOpen] = React.useState(false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setDeleteDialog(state => ({ ...state, open: false }))
        }

    };

    return (
        <div>

            <Dialog
                open={deleteDialog.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"> {deleteDialog.heading}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {deleteDialog.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        disabled={deleteDialog.deleting}
                        onClick={() => setDeleteDialog(state => ({ ...state, open: false }))} >
                        {deleteDialog.cancel}
                    </Button>
                    <Button onClick={handleConfirm} disabled={deleteDialog.deleting}  >
                        {deleteDialog.deleting && <CircularProgress
                            size={18} style={{ marginRight: "10px" }} />}
                        {deleteDialog.confirm}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}