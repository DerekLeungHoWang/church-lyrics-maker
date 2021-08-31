import { Button, ButtonGroup, Container, FormControlLabel, Grid, IconButton, Paper, Slider, Switch, TextField, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { PropertiesContext } from '../../../../../../context/PropertiesContext';
import { font_size, others_properties, text_properties, type_buttonColor, type_buttonGroup, type_slider, type_switch } from '../SettingConstant';
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
export default function Others() {
    const [displayColorPicker, setDisplayColorPicker] = useState(false)
    const { properties, setProperties, handleSetProperties } = useContext(PropertiesContext)

    

    function valuetext(value) {
        return `${value}px`;
    }

    const handleChange = () => {
        setProperties(state => ({
            ...state,
            others: {
                ...state.others,
                slideAnimation: !properties.others.slideAnimation
            }
        }))
    }



    return (
        <Container maxWidth={false}>
            <Typography variant="h5">Other Settings</Typography>
            <Typography style={{marginTop:"5px",marginBottom:"20px",opacity:"0.7" }} >Text related properties</Typography>
            <Paper elevation={6} style={{ padding: "55px", borderRadius: "8px" }}>
                <Grid container>
                    {others_properties.map(({ propName, displayName, inputType, }, i) => {
                        return (
                            <React.Fragment key={i}>

                                {inputType == type_switch &&
                                    <Grid container direction="column" >
                                        <Typography style={{ marginBottom: "40px", fontWeight: "600", fontSize: "15px" }}>{displayName}</Typography>
                                        <div style={{ marginBottom: "40px" }}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={properties.others.slideAnimation}
                                                        onChange={handleChange}
                                                        name="checkedB"
                                                        color="secondary"
                                                    />
                                                }
                                                label="Slide Animation"
                                            />
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
