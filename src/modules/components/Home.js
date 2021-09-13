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
import DeleteDialog from './util/DeleteDialog';
import { DragDropContext } from "react-beautiful-dnd";
import Navbar from './Navbar/Navbar';
import { FormattedMessage } from 'react-intl';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}



export default function Home({ locale }) {
    
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
    const [loadingOne, setLoadingOne] = useState(false);
    const [submitting, setSubmitting] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState({
        open: false,
        title: "",
        heading: <FormattedMessage id="lyricsMaker.deleteAlert.heading" />,
        message: <FormattedMessage id="lyricsMaker.deleteAlert.message" />,
        cancel: <FormattedMessage id="lyricsMaker.deleteAlert.cancel" />,
        confirm: <FormattedMessage id="lyricsMaker.deleteAlert.confirm" />,
        deleting: false,
    })
    
    const { properties, setProperties, handleSetProperties, errors, setErrors, handleBlur, handleSmartSplit } = useContext(PropertiesContext)


    const { vertical, horizontal, open, message } = snack;
    const [playId, setPlayId] = useState();
    const [isEditMode, setIsEditMode] = useState(false);
    const initializeState = () => (
        JSON.parse(localStorage.getItem("cart")) || []
    );
    const [cart, setCart] = useState(initializeState())

    const handleSubmit = (e) => {
        e.preventDefault()

        let result_title = validator(properties, 'title')
        let result_content = validator(properties, 'content')
        if (result_title.title || result_content.content) {
            setErrors(state => ({
                ...state,
                title: result_title.title ? result_title.title : "",
                content: result_content.content ? result_content.content : "",

            }))
            return;
        }
        setSubmitting(true)
        
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

        axios.post(`${API_BASE_URL}/lyrics/add`, lyricsObject)
            .then((res) => {
                getSongList()
                    .then(songList => {

                        
                        let target = songList.data.filter(d => d.title.trim().toLowerCase() === lyricsObject.title.trim().toLowerCase())
                        let isExist = cart.length > 0 && cart.some(obj => {
                            
                            
                            return obj.title.replace(/\s/g, '') === target[0].title.replace(/\s/g, '')
                        });
                        if (isExist) {
                            let newCart = cart
                            newCart = newCart.map(d => {
                                if (d._id == target[0]._id) {
                                    d = properties
                                }
                                return d
                            })

                            setCart(newCart)
                        }
                        setProperties(state => ({
                            ...state,
                            title: "",
                            content: "",
                            composer: "",
                            lyricist: "",
                            img: ""
                        }))
                        setSubmitting(false)
                    })


            })


    }


    const handleSetId = e => {
        let id = +e.currentTarget.name
        console.log(cart);
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
        history.push(`/${locale}/player/${id}`)
    }


    const handleDelete = (e) => {
        let id = +e.currentTarget.name
        let filtered = cart.filter((d, i) => i !== id)
        setCart(filtered);

    }
    const handleAddToPlayList = id => {

        let target = lyricsData.filter(d => d._id == id)[0]
        target._id = id
        let isExist = cart.some(obj => obj._id === target._id);

        
        if (!isExist) {
            setSnack(state => ({
                ...state,
                open: false
            }))
            setCart(state => [...state, target]);
        }



    }

    const handleDeleteFromTable = e => {
        setDeleteDialog(state => ({ ...state, deleting: true }))
        axios.delete(`${API_BASE_URL}/lyrics/${deleteDialog.id}`)
            .then((res) => {
                setDeleteDialog(state => ({
                    ...state,
                    id: "",
                    open: false,
                    deleting: false
                }))
                let newCart = cart.filter(d => d._id !== deleteDialog.id)
                setCart(newCart)
                getSongList()
            })
    }

    const handleFindOneFromTable = e => {
        setLoadingOne(true)
        let id = e.currentTarget.name
        axios.get(`${API_BASE_URL}/lyrics/${id}`)
            .then((res) => {
                
                setProperties(res.data)
                setLoadingOne(false)
                setErrors(state => ({ ...state, title: "", content: "" }))
            })
    }

    useEffect(() => {
        console.log("updating cart in useEffect");
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])



    //=============================================================Load Table
   
    useEffect(() => {
        let name = 'churchLyricsMaker'
        let version = '1.0.1'
        
        const last_version = localStorage.getItem(`${name}-Version`)
        if (last_version !== version) {
            
            localStorage.setItem(`${name}-Version`, version)
           localStorage.removeItem("cart")
        }

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
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };
    const onDragEnd = ({ destination, source, draggableId }) => {

        
        if (!destination) {
            
            return;
        }

        if (destination.draggableId === source.draggableId &&
            destination.index === source.index
        ) {
            
            return;
        }

        const newCart = reorder(
            cart,
            source.index,
            destination.index
        );
        
        setCart(newCart)
    }



    return (
        <Container maxWidth="xl"
            style={{
                minHeight: "100vh"
            }} >

            <div>
                <Navbar locale={locale} />
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                    style={{ padding: "0px 10px 0px 0px", }}
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
                            handleDeleteFromTable={(e, title) => setDeleteDialog(state => ({ ...state, id: e.currentTarget.name, open: true }))}
                            handleFindOneFromTable={handleFindOneFromTable}
                            loadingLyricsData={loadingLyricsData}
                        />

                        <DragDropContext onDragEnd={onDragEnd}>
                            <LyricsPlayList
                                properties={properties}
                                setPlayId={handleSetId}
                                cart={cart}
                                handleDelete={handleDelete} />

                        </DragDropContext>

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
                            submitting={submitting}
                            loadingOne={loadingOne}
                            handleSmartSplit={handleSmartSplit}
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
                <DeleteDialog
                    handleConfirm={handleDeleteFromTable}
                    deleteDialog={deleteDialog}
                    setDeleteDialog={setDeleteDialog} />
            </div>

        </Container>
    )
}
