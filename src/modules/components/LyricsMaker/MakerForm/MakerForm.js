import { Button, Container, InputAdornment, MenuItem, Paper, TextField, Typography } from '@material-ui/core'
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
            <Typography component="h1" variant="h5" style={{ padding: "20px 0px 0px 0px" }}>
                添加詩歌
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="歌名"
                    name="title"
                    autoComplete="title"
                    onChange={handleChange}
                    value={lyrics.title}
                    autoFocus
                />
                <TextField
                    required
                    fullWidth
                    variant="outlined"
                    id="standard-multiline-flexible"
                    label="歌詞"
                    multiline
                    rows={10}
                    name="content"
                    value={lyrics.content}
                    onChange={handleChange}
                    autoComplete="content"
                />
                <TextField
                    required
                    margin="normal"
                    fullWidth
                    id="fontSize"
                    inputProps={{
                        maxLength: 3,
                    }}
                    label="字體大小"
                    name="fontSize"
                    value={lyrics.fontSize}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                        endAdornment: <InputAdornment position="start">px</InputAdornment>,
                    }}
                />
                <TextField

                    margin="normal"
                    fullWidth
                    id="fontColor"
                   
                    label="字幕顏色"
                    name="fontColor"
                    value={lyrics.fontColor}
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="例子, #74c4aa, 如不填寫則為白色 (#fff) "
                    InputLabelProps={{
                        shrink: true
                    }}

                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="img"
                    label="背景圖片"
                    name="img"
                    value={lyrics.img}
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="選填, 不填寫則為全黑背景"
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="height"
                    label="圖片所佔高度 (%)"
                    name="height"
                    value={lyrics.height}
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="選填, 不填寫則為 20 "
                 
                    InputLabelProps={{
                        shrink: true
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="start">%</InputAdornment>,
                    }}
                />

                <Button type="submit" variant="outlined" style={{ margin: "15px 0px" }}>
                    建立
                </Button>

            </form>




        </Container>
    )
}
