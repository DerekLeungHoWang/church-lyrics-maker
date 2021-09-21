import { Button, ButtonGroup, Container, Grid, IconButton, makeStyles, Paper, Slider, TextField, Typography, useTheme } from '@material-ui/core'
import React, { useContext } from 'react'
import { PropertiesContext } from '../../../../../../context/PropertiesContext';
import { font_size, text_properties, type_buttonColor, type_buttonGroup, type_slider } from '../SettingConstant';
import BrushIcon from '@material-ui/icons/Brush';
import { useState } from 'react';
import { ChromePicker } from 'react-color';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
const AlignButton = styled(Button)`
    background: ${({ theme, active, name, propvalue }) => {
        if (propvalue == active[`${name}`]) {
            return theme.palette.secondary.main
        } else {
            return "white"
        }
    }};
    color: ${({ theme, active, name, propvalue }) => {
        if (propvalue == active[`${name}`]) {
            return "white"
        } else {
            return "black"
        }
    }};
    &:hover{
        background: ${props => props.theme.palette.secondary.main};
         
        color:white;
    }

`

const popover = {
    position: 'absolute',
    zIndex: '999',
    right: "50vw"
}
const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',

}

export default function TextControl() {

    const theme = useTheme();
    const [displayColorPicker, setDisplayColorPicker] = useState(false)
    const { properties, setProperties, handleSetProperties, classes } = useContext(PropertiesContext)

    function valuetext(value) {
        return `${value}px`;
    }

    const handleTextPropertyChange = name => (event, newValue) => {


        let config = {
            channel: "text",
            property: name
        }
        handleSetProperties(config, newValue)
    }

    const handlePropertyClick = (e, propValue) => {
        let propName = e.currentTarget.name;


        setProperties(state => ({
            ...state,
            text: {
                ...state.text,
                [propName]: propValue
            }
        }))
    }

    return (
        <Container maxWidth={false}>
            <Typography variant="h5"><FormattedMessage id="lyricsMaker.advance.textControl" /></Typography>
            <Typography style={{ marginTop: "5px", marginBottom: "20px", opacity: "0.7" }} ><FormattedMessage id="lyricsMaker.advance.textControl.description" /></Typography>
            <Paper elevation={3} style={{ padding: "55px", borderRadius: "18px" }}>
                <Grid container>
                    {text_properties.map(({ propName, displayName, inputType, marks, min, max, step, options }, i) => {

                        return (
                            <React.Fragment key={i}>
                                {inputType == type_slider &&
                                    <>
                                        <Typography style={{
                                            marginBottom: "40px",
                                            fontWeight: "600", fontSize: "15px", valueLabel: { color: "white" }
                                        }}>{displayName}</Typography>
                                        < Slider
                                            classes={{ valueLabel: classes.valueLabel }}
                                            style={{ marginBottom: "50px" }}
                                            name={propName}
                                            value={properties.text[`${propName}`]}
                                            onChange={handleTextPropertyChange(propName)}
                                            color="secondary"
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
                                        <Typography style={{ marginBottom: "40px", fontWeight: "600", fontSize: "15px" }}>{displayName}</Typography>
                                        <div style={{ marginBottom: "40px" }}>
                                            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                                {options.map(({ icon, propValue }, i) => (
                                                    <AlignButton
                                                        size="large"
                                                        variant="contained"
                                                        theme={theme}
                                                        active={properties.text}
                                                        propvalue={propValue}
                                                        name={propName}
                                                        onClick={(e) => handlePropertyClick(e, propValue)} key={i}>{icon}</AlignButton>
                                                ))}
                                            </ButtonGroup>
                                        </div>
                                    </Grid>
                                }
                                {inputType == type_buttonColor &&
                                    <Grid container direction="column" >
                                        <Typography style={{ marginBottom: "20px", fontWeight: "600", fontSize: "15px" }}>{displayName}</Typography>
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
                                        <div style={{position:"relative"}}>

                                            <IconButton onClick={() => setDisplayColorPicker(!displayColorPicker)} ><BrushIcon /></IconButton>
                                            <div style={{ 
                                                border: "1px solid black",
                                                position: "absolute",
                                                top:"25px",
                                                left:"1px",
                                                background: properties.text.textColor, 
                                                height: "9px", width: "9px", borderRadius: "50%" }} ></div>
                                        </div>
                                    </Grid>
                                }
                            </React.Fragment>
                        )
                    })}

                </Grid>
            </Paper>

        </Container>
    )
}
