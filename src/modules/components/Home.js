import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container';
import LyricsMaker from './LyricsMaker/LyricsMaker';
import LyricsStorage from './LyricsStorage/LyricsStorage';
import { Grid } from '@material-ui/core';

export default function Home() {


    const [lyrics, setLyrics] = useState({
        title: "只要祝福",
        content: `只有祝福令我欣慰，祂每天細心拖帶，給我鼓舞為我打氣。
祂陪伴同上路，神導引讓我躺青草處，越過死蔭幽谷。
慈愛盛載，福杯充滿，同渡過一世一生。
願我生命只要祝福，突破不足畏懼心態。
神愛讓我活在恩典，充滿祝福，就算手中只有一點，
願獻主成千億祝福，神永讓我活在恩典中，讚美。`,

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
            content: newLyrics
        }
        setCart(state => [...state, lyricsObject]);

    }

    const handleDelete = (e) => {
        let id = +e.currentTarget.name
        console.log(id);
        let filtered = cart.filter((d, i) => i !== id)
        console.log(filtered);
        setCart(filtered);
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    return (
        <Container maxWidth={false} >
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid
                    lg={6}
                    container
                    item
                    direction="row"
                    justifyContent="center"
                    alignItems="center"

                >

                    <LyricsStorage cart={cart} handleDelete={handleDelete} />
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
