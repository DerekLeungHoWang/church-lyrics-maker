import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container';
import LyricsMaker from './LyricsMaker/LyricsMaker';
import LyricsStorage from './LyricsStorage/LyricsStorage';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LyricsPlayer from './LyricsPlayer/LyricsPlayer';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { arrayToString, stringToArray } from './util/converter';
import useForm from './LyricsMaker/MakerForm/useForm';
import { validator } from './LyricsMaker/MakerForm/Validator'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}



export default function Home(props) {


    const history = useHistory();
    const [snack, setSnack] = React.useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        message: '已覆寫'
    });


    useEffect(() => {
        if (snack.open) {
            setTimeout(() => {
                setSnack(state => ({ ...state, open: false }))
            }, 1000);
        }
        return () => {
            clearTimeout()
        }
    }, [snack])
    const [active, setActive] = useState("")
    const [loaded, setLoaded] = useState(false);
    const { lyrics, setLyrics, errors, setErrors, handleBlur } = useForm(validator);
    const { vertical, horizontal, open, message } = snack;
    const [playId, setPlayId] = useState();
    const [isEditMode, setIsEditMode] = useState(false);
    const initializeState = () => (
        JSON.parse(localStorage.getItem("cart")) || []
    );
    const [cart, setCart] = useState(initializeState())

    const handleSubmit = (e) => {
        e.preventDefault()
        let result_title = validator(lyrics, 'title')
        let result_content = validator(lyrics, 'content')
        if (result_title.tilte || result_content.content) {

            setErrors(state => ({
                ...state,
                title: result_title.title ? result_title.title : "",
                content: result_content.content ? result_content.content : "",

            }))
            return;
        }


        let newLyrics = lyrics.content
        if (!Array.isArray(lyrics.content)) {
            newLyrics = lyrics.content.trim().split("\n\n");
        }

        let lyricsObject = {
            title: lyrics.title,
            content: newLyrics,
            fontSize: lyrics.fontSize,
            fontColor: lyrics.fontColor,
            img: lyrics.img,
            height: lyrics.height,
            textColor: lyrics.textColor,
            lastPlayed: lyrics.lastPlayed,

        }

        let isExist = cart.some(obj => obj.title.replace(/\s/g, '') === lyricsObject.title.replace(/\s/g, ''));
        if (isExist) {
            let newCart = cart.map(d => {
                if (d.title === lyricsObject.title) {
                    d = lyricsObject
                }
                return d
            })
            setCart(newCart)
            setSnack(state => ({
                ...state,
                open: true,
                message: `已覆寫 ${lyrics.title} `
            }))
        } else {
            setSnack(state => ({
                ...state,
                open: false
            }))
            setCart(state => [...state, lyricsObject]);
        }


    }


    const handleSetId = e => {
        let id = +e.currentTarget.name
        cart.forEach(target => {
            target = stringToArray(cart, target)
            target.lastPlayed = false
            target.isActive = false
            let newCart = cart.map((d, i) => {
                if (d.title === target.title) {

                    d = target
                }

                if (i === id) {
                    d.lastPlayed = true
                    d.isActive = true
                }


                return d
            })




            setCart(newCart)
            localStorage.setItem('cart', JSON.stringify(cart))
        })



        setPlayId(id)
        history.push(`/player/${id}`)
    }


    const handleDelete = (e) => {
        let id = +e.currentTarget.name
        let filtered = cart.filter((d, i) => i !== id)

        setCart(filtered);
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])
    useEffect(() => {
        if (cart.length > 0) {
            let target = cart.filter(d => {
                return d.lastPlayed
            })

            if (target.length > 0) {
                target = arrayToString(cart, target[0])
                if (target.lastPlayed) {
                    setIsEditMode(true)
                }
                setLyrics(target)
            }
        }
    }, [])



    const handleLoad = (e) => {
        let id = +e.currentTarget.name
        let target = cart.filter((d, i) => i == id)[0]

        if (target.title !== active) {
            setLoaded(false)
        }

        target = arrayToString(cart, target)
        setActive(target.title)
        setIsEditMode(true)

        setLyrics(target)
    }
    console.log(active);
    useEffect(() => {
        console.log(lyrics);
        if (!lyrics.tilte && !lyrics.content) {
            console.log('set');
            setIsEditMode(false)
        }
    }, [lyrics])
    return (
        <Container maxWidth="lg"
            style={{

                minHeight: "100vh"
            }} >
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                style={{ padding: "20px 0px", }}
            >
                <Grid
                    lg={6}
                    container
                    item
                    direction="row"
                    justifyContent="center"
                    alignItems="center"

                >


                    <LyricsStorage
                        lyrics={lyrics}
                        handleLoad={handleLoad}
                        setPlayId={handleSetId}
                        cart={cart}
                        handleDelete={handleDelete} />



                </Grid>
                <Grid
                    lg={6}
                    container
                    item
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >

                    <LyricsMaker
                        setCart={setCart}
                        lyrics={lyrics}
                        setLyrics={setLyrics}
                        handleSubmit={handleSubmit}
                        isEditMode={isEditMode}
                        setIsEditMode={setIsEditMode}
                        cart={cart}
                        errors={errors}
                        setErrors={setErrors}
                        handleBlur={handleBlur}

                        loaded={loaded}
                        setLoaded={setLoaded}
                    />
                </Grid>

            </Grid>

            <Snackbar

                anchorOrigin={{ vertical, horizontal }}
                open={open}
                message="已覆寫"
                key={vertical + horizontal}
            >
                <Alert severity="success">
                    {message}
                </Alert>
            </Snackbar>


        </Container>
    )
}
