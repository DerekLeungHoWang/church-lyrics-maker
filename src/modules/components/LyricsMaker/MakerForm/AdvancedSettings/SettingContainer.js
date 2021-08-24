import { Container, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import AdvancedNavigation from './AdvancedNavigation'
import SettingContent from './SettingContent/SettingContent'
import { text_control, image_control, others_settings } from './SettingContent/SettingConstant'

export default function SettingContainer() {

    const [active, setActive] = useState(text_control)

    const handleSetActive = (e) => {
        let section = e.currentTarget.getAttribute("name").toLowerCase().replace(/ /g, '')
        setActive(section)
    }

    return (
        <Container maxWidth="lg" style={{marginTop:"50px",marginBottom:"100px"}}>
            <Grid container >

                <Grid container item lg={3} >
                    <AdvancedNavigation active={active} handleSetActive={handleSetActive} />
                </Grid>
                <Grid container item lg={9}>
                    <SettingContent active={active} />
                </Grid>


            </Grid>
        </Container>
    )
}
