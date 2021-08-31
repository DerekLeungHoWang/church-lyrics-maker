import { Avatar, Box, Button, Container, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Typography } from '@material-ui/core'
import React from 'react'
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { ReactComponent as NoDataSvg } from '../../../Images/noData.svg'
import LyricsPlayer from '../LyricsPlayer/LyricsPlayer';
import GetAppIcon from '@material-ui/icons/GetApp';
import EditIcon from '@material-ui/icons/Edit';
export default function LyricsPlayList({ setPlayId, cart, handleDelete, properties }) {

    return (
        <Container maxWidth={false} style={{ padding: "0px" }}>
            <Paper elevation={3} style={{ position: "relative", marginBottom: "20px", borderRadius: "18px" }} >
                <Box ml={3} pt={3}>
                    <Typography variant="h6" component="div" >Playlist</Typography>
                </Box>
                <List dense={false} >
                    {cart.length > 0 ? cart.map(({ title, composer, lyricist, content }, i) => {
                        if (Array.isArray(content)) {
                            content = content.join(",")

                        }
                        content = content.substring(0, 30)
                        return (<ListItem key={i}>
                            <ListItemAvatar>
                                <Avatar>
                                    <MusicNoteIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Grid container
                                    >
                                        <span style={{ paddingRight: "10px", fontWeight: properties.title === title ? "600" : "unset" }} >
                                            {title}</span>
                                    </Grid>
                                }
                                secondary={
                                    <Grid container component="span" >

                                        <Typography component="span" >
                                            {content} ...
                                        </Typography >



                                    </Grid>
                                }
                            />


                            <ListItemSecondaryAction>

                                <IconButton
                                    name={i}
                                    onClick={(e) => setPlayId(e)}
                                    aria-label="play">
                                    <PlayCircleFilledIcon />
                                </IconButton>

                                <IconButton
                                    name={i} aria-label="delete"
                                    onClick={(e) => handleDelete(e)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>)
                    }) : <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        style={{ height: "200px" }}
                    >
                        <NoDataSvg style={{ height: "100px", width: "100px" }} />

                        <p style={{ fontWeight: "600", color: "grey" }} >
                            沒有資料
                        </p>
                    </Grid>}
                </List>
            </Paper>



        </Container >
    )
}
