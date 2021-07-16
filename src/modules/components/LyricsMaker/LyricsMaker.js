import { Container, Paper } from '@material-ui/core'
import React from 'react'
import MakerForm from './MakerForm/MakerForm'

export default function LyricsMaker({ handleSubmit,

    lyrics ,
    setLyrics 
}) {
    return (
        <Container>

            <Paper elevation={3} >
                <MakerForm
                    handleSubmit={handleSubmit}
                    lyrics={lyrics}
                    setLyrics={setLyrics}

                />
            </Paper>
        </Container>
    )
}
