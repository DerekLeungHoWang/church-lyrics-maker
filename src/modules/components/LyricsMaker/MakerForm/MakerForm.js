import { Button, Container, Paper, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    //    formControl: {
    //     margin: theme.spacing(1),
    //     minWidth: 120,

    // },
}), { index: 1 });
export default function MakerForm({
    handleSubmit,
    lyrics,
    setLyrics
}) {
    const classes = useStyles();


    const handleChange = (e) => {

        setLyrics(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))


    }
   


    return (
        <Container>
            <Typography component="h1" variant="h5">
                送貨地址
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="名字"
                    name="title"
                    autoComplete="title"
                    onChange={handleChange}
                    value={lyrics.title}
                    autoFocus
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    id="standard-multiline-flexible"
                    label="content"
                    multiline
                    rows={15}
                    name="content"
                    value={lyrics.content}
                    onChange={handleChange}
                />
                <Button type="submit" >
                    Create
                </Button>

            </form>




        </Container>
    )
}
