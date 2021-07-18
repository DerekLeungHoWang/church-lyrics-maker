import { Container, Paper } from '@material-ui/core'
import React from 'react'
import MakerForm from './MakerForm/MakerForm'

export default function LyricsMaker({ handleSubmit,
    setCart,
    lyrics,
    setLyrics,
    isEditMode,
    setIsEditMode,
    cart
}) {
    return (
        <Container>

            <Paper elevation={3} style={{ borderRadius: "15px" }} >
                <MakerForm
                    handleSubmit={handleSubmit}
                    lyrics={lyrics}
                    setLyrics={setLyrics}
                    setCart={setCart}
                    isEditMode={isEditMode}
                    setIsEditMode={setIsEditMode}
                    cart={cart}
                />
            </Paper>
        </Container>
    )
}
