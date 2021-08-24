import { Button, ButtonGroup, Container, Grid, IconButton, Paper, Slider, TextField, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { PropertiesContext } from '../../../../../../context/PropertiesContext';
import { font_size, text_properties, type_buttonColor, type_buttonGroup, type_textField } from '../SettingConstant';
import BrushIcon from '@material-ui/icons/Brush';
import { useState } from 'react';
import { ChromePicker } from 'react-color';
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
export default function TextControl() {
    const [displayColorPicker, setDisplayColorPicker] = useState(false)
    const { properties, setProperties, handleSetProperties } = useContext(PropertiesContext)

    console.log(properties);

    function valuetext(value) {
        return `${value}px`;
    }

    const handleTextPropertyChange = name => (event, newValue) => {
        console.log(name);

        let config = {
            channel: "text",
            property: name
        }
        handleSetProperties(config, newValue)
    }

    return (
        <Container maxWidth={false}>
            <Typography variant="h4">Text</Typography>
            <Typography variant="p">Text related properties</Typography>
            <Paper elevation={3} style={{ padding: "55px", borderRadius: "8px" }}>
                <Grid container>
                    {text_properties.map(({ name, displayName, inputType, marks, min, max, step, options }) => {
                        return (
                            <>

                                {inputType == type_textField &&
                                    <>
                                        <Typography variant="p" style={{ marginBottom: "40px", fontWeight: "600", fontSize: "15px" }}>{displayName}</Typography>
                                        < Slider
                                            style={{ marginBottom: "50px" }}
                                            name={name}
                                            value={properties.text.name}
                                            onChange={handleTextPropertyChange(name)}
                                            defaultValue={60}
                                            getAriaValueText={valuetext}
                                            aria-labelledby="discrete-slider-always"
                                            step={step}
                                            marks={marks}
                                            valueLabelDisplay="on"
                                            min={min}
                                            max={max}

                                        />
                                    </>
                                }
                                {inputType == type_buttonGroup &&
                                    <Grid container direction="column" >
                                        <Typography variant="p" style={{ marginBottom: "40px", fontWeight: "600", fontSize: "15px" }}>{displayName}</Typography>
                                        <div style={{ marginBottom: "40px" }}>
                                            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                                {options.map(option => (
                                                    <IconButton >{option}</IconButton>
                                                ))}
                                            </ButtonGroup>
                                        </div>
                                    </Grid>
                                }
                                {inputType == type_buttonColor &&
                                    <Grid container direction="column" >
                                        <Typography variant="p" style={{ marginBottom: "20px", fontWeight: "600", fontSize: "15px" }}>{displayName}</Typography>
                                        {displayColorPicker ? <div style={popover}>
                                            <div style={cover} onClick={() => setDisplayColorPicker(false)} />
                                            <ChromePicker
                                                disableAlpha

                                                color={properties.text.textColor}
                                                onChange={(color) => setProperties(state => ({
                                                    ...state,
                                                    text: {
                                                        ...state.text,
                                                        textColor: color.hex
                                                    }
                                                }))}
                                            // onChangeComplete={handleSetColor}
                                            />
                                        </div> : null}
                                        <div>
                                            <IconButton onClick={() => setDisplayColorPicker(!displayColorPicker)} ><BrushIcon /></IconButton>
                                        </div>
                                    </Grid>
                                }
                            </>
                        )
                    })}

                </Grid>
            </Paper>

        </Container>
    )
}
