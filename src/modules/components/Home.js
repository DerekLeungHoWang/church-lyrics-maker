import React, { useContext, useEffect, useState } from 'react'
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
import { PropertiesContext } from '../context/PropertiesContext';

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
    //const { errors, setErrors, handleBlur } = useForm(validator);
    const { properties, setProperties, handleSetProperties, errors, setErrors, handleBlur } = useContext(PropertiesContext)

    console.log(properties);
    const { vertical, horizontal, open, message } = snack;
    const [playId, setPlayId] = useState();
    const [isEditMode, setIsEditMode] = useState(false);
    const initializeState = () => (
        JSON.parse(localStorage.getItem("cart")) || []
    );
    const [cart, setCart] = useState(initializeState())

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("handleing Submit Home.js", properties);
        let result_title = validator(properties, 'title')
        let result_content = validator(properties, 'content')
        if (result_title.tilte || result_content.content) {

            setErrors(state => ({
                ...state,
                title: result_title.title ? result_title.title : "",
                content: result_content.content ? result_content.content : "",

            }))
            return;
        }


        let newLyrics = properties.content
        if (!Array.isArray(properties.content)) {
            newLyrics = properties.content.trim().split("\n\n");
        }

        let lyricsObject = {
            title: properties.title,
            content: newLyrics,
            fontSize: properties.fontSize,
            fontColor: properties.fontColor,
            img: properties.img,
            height: properties.height,
            textColor: properties.textColor,
            lastPlayed: properties.lastPlayed,
            text: properties.text,
            image: properties.image,
            others: properties.others

        }
        console.log("lyricsObject = ", lyricsObject);
        let isExist = cart.some(obj => obj.title.replace(/\s/g, '') === lyricsObject.title.replace(/\s/g, ''));
        if (isExist) {
            console.log("already exist : ", lyricsObject);

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
                message: `已覆寫 ${properties.title} `
            }))
        } else {
            console.log("does not exist");
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
                console.log("prop before set = ", properties);
                console.log("target = ", target);
                setProperties(target)
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

        setProperties(target)
    }
    console.log(active);
    useEffect(() => {
        console.log(properties);
        if (!properties.tilte && !properties.content) {
            console.log('set');
            setIsEditMode(false)
        }
    }, [properties])


 


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
                        properties={properties}
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
                        properties={properties}
                        setProperties={setProperties}
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
