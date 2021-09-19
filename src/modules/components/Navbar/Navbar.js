import { Box, Button, Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { FormattedMessage } from 'react-intl';
export default function Navbar({ locale }) {

    const history = useHistory()
    const handleSwitchRoute = () => {
        let latestLocale = localStorage.getItem('locale')
        localStorage.setItem('locale', latestLocale === "en" ? "zh" : "en")
        history.push(`/${latestLocale === "en" ? "zh" : "en"}`)
        window.location.reload()
    }

    return (
        <Container style={{ maxWidth: "100%", padding: "0px" }} >
            <Box m={2}>
                <Grid container justifyContent="space-between"  >
                    <Box ml={1}>
                        <Typography variant="h5"><FormattedMessage id="app.title" /></Typography>
                    </Box>
                    <Box mr={0}>
                        <Button onClick={handleSwitchRoute} >{locale === "en" ? "中文" : "English"}</Button>
                    </Box>

                </Grid>
            </Box>

        </Container>
    )
}
