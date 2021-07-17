import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container';
import LyricsMaker from './LyricsMaker/LyricsMaker';
import LyricsStorage from './LyricsStorage/LyricsStorage';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export default function Home(props) {
    const history = useHistory();
    const [playId, setPlayId] = useState();
    const [lyrics, setLyrics] = useState({
        title: "",
        content: ``,
        fontSize: "60",
        fontColor: "#fff",
        img: "",
        height: "",

    })
    const initializeState = () => (
        JSON.parse(localStorage.getItem("cart")) || []
    );
    const [cart, setCart] = useState(initializeState())

    const handleSubmit = (e) => {
        e.preventDefault()
        let newLyrics = lyrics.content.split("\n\n");
        let lyricsObject = {
            title: lyrics.title,
            content: newLyrics,
            fontSize: lyrics.fontSize,
            fontColor: lyrics.fontColor,
            img: lyrics.img,
            height: lyrics.height
        }
        // setLyrics(state => ({
        //     ...state,
        //     title: "",
        //     content: ``,
        // }))
        setCart(state => [...state, lyricsObject]);

    }

    const handleSetId = e => {
        let id = e.currentTarget.name
        
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

    return (
        <Container maxWidth="lg"
            style={{

                minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center"
            }} >
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
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
                        setPlayId={handleSetId}
                        cart={cart} handleDelete={handleDelete} />
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
                        lyrics={lyrics}
                        setLyrics={setLyrics}
                        handleSubmit={handleSubmit} />
                </Grid>

            </Grid>


        </Container>
    )
}
