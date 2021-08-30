import React, { useContext, useEffect, useState } from 'react'
import Container from '@material-ui/core/Container';
import LyricsMaker from './LyricsMaker/LyricsMaker';
import LyricsPlayList from './LyricsPlayList/LyricsPlayList';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LyricsPlayer from './LyricsPlayer/LyricsPlayer';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { arrayToString, stringToArray } from './util/converter';
import useForm from './LyricsMaker/MakerForm/useForm';
import { validator } from './LyricsMaker/MakerForm/Validator'
import { PropertiesContext } from '../context/PropertiesContext';
import LyricsTable from './LyricsTable/LyricsTable';
import axios from 'axios';
import { API_BASE_URL } from '../constant';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}



export default function Home(props) {

    const history = useHistory();
    const [loadingLyricsData, setLoadingLyricsData] = useState(false)
    const [snack, setSnack] = React.useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        message: '已覆寫'
    });
    const [lyricsData, setLyricsData] = useState([])


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
            lyricist: properties.lyricist,
            composer: properties.composer,
            content: newLyrics,
            img: properties.img,
            text: properties.text,
            image: properties.image,
            others: properties.others

        }
        console.log("lyricsObject = ", lyricsObject);
        axios.post(`${API_BASE_URL}/lyrics/add`, lyricsObject)
            .then((res) => {
                getSongList()
                    .then(songList => {
                        console.log(songList);

                        let target = songList.data.filter(d => d.title.trim().toLowerCase() === lyricsObject.title.trim().toLowerCase())
                        console.log(target);
                        handleAddToPlayList(target[0]._id)
                    })


            })


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
    const handleAddToPlayList = id => {
        console.log("handled id " , id);
        let target = lyricsData.filter(d => d._id == id)[0]
        let isExist = cart.some(obj => obj.title.replace(/\s/g, '') === target.title.replace(/\s/g, ''));
        if (isExist) {
            console.log("yes exist !!!");
            console.log("target = ", target);
            let newCart = cart
            newCart=newCart.map(d => {
                console.log(d);
                if (d._id == id) {
                    d=properties
                }
                return d
            })
            console.log(newCart);
            setCart(newCart)
        } else {
            console.log("does not exist");
            setSnack(state => ({
                ...state,
                open: false
            }))
            setCart(state => [...state, target]);
        }



    }

    const handleDeleteFromTable = e => {
        let id = e.currentTarget.name
        axios.delete(`${API_BASE_URL}/lyrics/${id}`)
            .then((res) => {
                getSongList()
            })
    }

    const handleFindOneFromTable = e => {
        let id = e.currentTarget.name
        axios.get(`${API_BASE_URL}/lyrics/${id}`)
            .then((res) => {
                setProperties(res.data)

            })
    }

    useEffect(() => {
        console.log("latest cart",cart);
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    //======================================================================================initialLoad
    // useEffect(() => {
    //     if (cart.length > 0) {
    //         let target = cart.filter(d => {
    //             return d.lastPlayed
    //         })

    //         if (target.length > 0) {
    //             target = arrayToString(cart, target[0])
    //             if (target.lastPlayed) {
    //                 setIsEditMode(true)
    //             }
    //             console.log("prop before set = ", properties);
    //             console.log("target = ", target);
    //             setProperties(target)
    //         }
    //     }
    // }, [])





    console.log(active);

    // useEffect(() => {
    //     console.log(properties);
    //     if (!properties.tilte && !properties.content) {
    //         console.log('set');
    //         setIsEditMode(false)
    //     }
    // }, [properties])

    //=============================================================Load Table
    useEffect(() => {
        getSongList()
    }, [])

    const getSongList = () => {
        setLoadingLyricsData(true)
        return axios.get(`${API_BASE_URL}/lyrics/getAll`)
            .then(res => {
                setLyricsData(res.data)
                setLoadingLyricsData(false)
                return res
            })
    }





    return (
        <Container maxWidth="xl"
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
                    <LyricsTable
                        lyricsData={lyricsData}
                        handleAddToPlayList={handleAddToPlayList}
                        handleDeleteFromTable={handleDeleteFromTable}
                        handleFindOneFromTable={handleFindOneFromTable}
                        loadingLyricsData={loadingLyricsData}
                    />


                    <LyricsPlayList
                        properties={properties}
                        setPlayId={handleSetId}
                        cart={cart}
                        handleDelete={handleDelete} />



                </Grid>
                <Grid
                    lg={4}
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
