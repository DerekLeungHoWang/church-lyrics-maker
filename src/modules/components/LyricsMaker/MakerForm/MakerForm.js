import { Button, Container, FormHelperText, Grid, InputAdornment, MenuItem, Paper, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish';
import FontSizeSlider from './FontSizeSlider';
import ImageArea from './ImageArea';
import { validator } from './Validator';
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
    handleBlur,
    errors,
    setErrors,
    handleSubmit,
    lyrics,
    setLyrics,
    setCart,
    isEditMode,
    setIsEditMode,
    loaded,
    setLoaded
}) {

    let cart = JSON.parse(localStorage.getItem('cart')) || []
    let lastSize = 60
    let lastColor = "#fff"
    let lastImg = ""


    const inputFile = useRef(null)
    const classes = useStyles();


    const handleChange = (e) => {
        let key = e.target.name
        let value = e.target.value
        setIsEditMode(true)
        if (key === "title") {
            setIsEditMode(false)
        }

        setLyrics(state => ({
            ...state,
            [key]: value
        }))


    }

    const handleUpload = () => {
        inputFile.current.click();
    }
    const handleFileChange = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {


            let cart = JSON.parse(e.target.result)
            setCart(cart)
        };
    }


    return (
        <Container >
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                direction="row"
                style={{ padding: "10px 0px 0px 0px" }}
            >
                <Typography component="h1" variant="h5" >
                    添加詩歌
                </Typography>
                <div>
                    <IconButton onClick={handleUpload}  >
                        <input
                            accept=".json"
                            onChange={(e) => handleFileChange(e)}
                            type='file' id='file' ref={inputFile} style={{ display: 'none' }} />
                        <PublishIcon />
                    </IconButton>
                    <Button variant="outlined" onClick={() => setLyrics(state => ({
                        ...state,
                        title: "",
                        content: ``,
                        fontSize: 60,
                        fontColor: "#fff",
                        height: "",
                        textColor: "#fff",
                        lastPlayed: false

                    }))} >新的詩歌</Button>
                </div>
            </Grid>


            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    onBlur={handleBlur}
                    error={errors.title ? true : false}
                    helperText={errors.title}
                    variant="outlined"
                    margin="normal"

                    fullWidth
                    id="title"
                    label="歌名"
                    name="title"
                    autoComplete="title"
                    onChange={handleChange}
                    value={lyrics.title}

                    InputLabelProps={{
                        shrink: true
                    }}
                    placeholder="以逗號分開歌名和作者, 例:無言的讚頌,曲、詞：朱浩權"
                />
                <TextField
                    error={errors.content ? true : false}
                    helperText={errors.content}
                    onBlur={handleBlur}

                    fullWidth
                    variant="outlined"
                    id="standard-multiline-flexible"
                    label="歌詞"
                    multiline
                    rows={20}
                    name="content"
                    value={lyrics.content}
                    onChange={handleChange}
                    autoComplete="content"
                />

                <FontSizeSlider lyrics={lyrics} setLyrics={setLyrics}
                // lastSize={lastSize}
                //  lastColor={lastColor}

                />

                <ImageArea
                    classes={classes}
                    lyrics={lyrics}
                    setLyrics={setLyrics}
                    setErrors={setErrors}
                    errors={errors}
                    loaded={loaded}
                    setLoaded={setLoaded}
                />




                <Grid
                    container
                    justifyContent="center"
                >
                    <Button
                        size="large"
                        type="submit" variant="outlined" style={{
                            margin: "20px 0px",

                        }}>
                        {isEditMode ? "儲存" : "建立"}
                    </Button>
                </Grid>

            </form>




        </Container>
    )
}
