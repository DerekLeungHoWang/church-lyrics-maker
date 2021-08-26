import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import FormatSizeIcon from '@material-ui/icons/FormatSize';
import { ChromePicker } from 'react-color'
import IconButton from '@material-ui/core/IconButton';
import BrushIcon from '@material-ui/icons/Brush';
import { Container } from '@material-ui/core';
const popover = {
    position: 'absolute',
    zIndex: '999',
}
const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
}
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
export default function FontSizeSlider({ properties, setProperties, 
    // lastSize, lastColor

}) {
  



    const [fontSize, setFontSize] = React.useState(60);
    const [displayColorPicker, setDisplayColorPicker] = useState(false)
    const [value, setValue] = React.useState(30);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function valuetext(value) {
        return `${value}px`;
    }

    const toggleColorBoard = () => {
        setDisplayColorPicker(!displayColorPicker)
    }

    const handleClose = () => {
        setDisplayColorPicker(false)
    }

    const handleSetColor = (color) => {
        
        setProperties(state => ({
            ...state,
            textColor: color.hex
        }))
    }

    const handleFontSizeChange = (event, newValue) => {
        setProperties(state => ({
            ...state,
            fontSize: newValue
        }))

    }

    return (
        <Container maxWidth={false} style={{ width: "100%", margin: "20px 0px", padding: "0px" }}>
            <Grid

                container
                justifyContent="space-between"
                alignContent="center"
                
            >
                <Grid
                    justifyContent="flex-start"
                    alignContent="center"
                    container item lg={11}>
                    <Typography id="continuous-slider" gutterBottom >
                        字體大小/顏色
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item>
                            <FormatSizeIcon style={{ fontSize: "130%" }} />
                        </Grid>
                        <Grid item xs>
                            <Slider
                                 value={properties.fontSize}
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
                        <Grid item>
                            <FormatSizeIcon />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    justifyContent="flex-start"
                    alignContent="center"
                    container item
                    lg={1}>
                    <div>
                        {displayColorPicker ? <div style={popover}>
                            <div style={cover} onClick={handleClose} />
                            <ChromePicker
                                disableAlpha
                               
                                color={properties.textColor}
                                onChange={(color) => setProperties(state => ({
                                    ...state,
                                    textColor: color.hex
                                }))}
                                //onChangeComplete={handleSetColor}
                            />
                        </div> : null}
                        <div>
                            <IconButton onClick={toggleColorBoard}  >
                                <BrushIcon />
                            </IconButton>
                        </div>
                    </div>

                </Grid>

            </Grid>

        </Container>
    )
}
