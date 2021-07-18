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
    const { vertical, horizontal, open, message } = snack;
    const [playId, setPlayId] = useState();
    const [isEditMode, setIsEditMode] = useState(false);
    const [lyrics, setLyrics] = useState({
        title: "",
        content: ``,
        fontSize: 60,
        fontColor: "#fff",
        img: "",
        height: "",
        textColor: "#fff",
        lastPlayed: false
    })
    const initializeState = () => (
        JSON.parse(localStorage.getItem("cart")) || []
    );
    const [cart, setCart] = useState(initializeState())

    const handleSubmit = (e) => {
        e.preventDefault()

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
            lastPlayed: lyrics.lastPlayed
        }

        let isExist = cart.some(obj => obj.title === lyricsObject.title);
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
            let newCart = cart.map((d, i) => {
                if (d.title === target.title) {
                    console.log('true  108 ', d.title, target);
                    d = target
                }

                if (i === id) {
                    d.lastPlayed = true
                }


                return d
            })
            console.log(newCart);



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
            })[0]
            target = arrayToString(cart, target)
            if(target.lastPlayed){
                setIsEditMode(true)
            }
            setLyrics(target)
        }
    }, [])


    // useEffect(() => {
    //     if (lyrics.img === "") {
    //         
    //         let newCart = cart.filter(d => d.title !== lyrics.title)
    //         localStorage.setItem('cart', JSON.stringify(newCart))
    //     }
    // }, [lyrics.img])

    // useEffect(() => {
    //     let cart = JSON.parse(localStorage.getItem("cart"))
    //     if (cart.length > 0) {
    //         let lastCart = cart[cart.length - 1];
    //         let newContent = "";
    //         for (let i = 0; i < lastCart.content.length; i++) {
    //             newContent += lastCart.content[i] + "\n\n"
    //         }


    //         lastCart.content = newContent.trim()
    //         setLyrics(lastCart)


    //     }


    // }, [])
    const handleLoad = (e) => {
        let id = +e.currentTarget.name
        let target = cart.filter((d, i) => i == id)[0]
        target = arrayToString(cart, target)
        setIsEditMode(true)

        setLyrics(target)
    }

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
