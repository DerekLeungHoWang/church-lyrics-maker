import { Container, Grid, Slider, TextField, Typography } from '@material-ui/core'
import React from 'react'

const marks = [
    {
        value: 20,
        label: '20px',
    },

    {
        value: 60,
        label: '60px',
    },
    {
        value: 90,
        label: '90px',
    },
];
export default function TextControl() {

    function valuetext(value) {
        return `${value}px`;
    }

    const handleFontSizeChange = (event, newValue) => {
        // setLyrics(state => ({
        //     ...state,
        //     fontSize: newValue
        // }))

    }

    return (
        <Container maxWidth={false}>
            <Typography variant="h4">Text</Typography>

            <Grid container>
                <Slider
                    value={60}
                    onChange={handleFontSizeChange}
                    defaultValue={60}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-always"
                    step={1}
                    marks={marks}
                    valueLabelDisplay="on"
                    max={90}
                    min={20}
                />
            </Grid>

        </Container>
    )
}
