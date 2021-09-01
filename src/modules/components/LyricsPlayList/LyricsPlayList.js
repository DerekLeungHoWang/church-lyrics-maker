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
import { Droppable, Draggable } from "react-beautiful-dnd";
import RootRef from "@material-ui/core/RootRef";
import { FormattedMessage } from 'react-intl';

export default function LyricsPlayList({ setPlayId, cart, handleDelete, properties }) {
    const ref = React.createRef();
    return (
        <Container maxWidth={false} style={{ padding: "0px" }}>
            <Paper elevation={3} style={{ position: "relative", marginBottom: "20px", borderRadius: "18px" }} >

                <Grid container justifyContent="space-between">
                    <Box ml={4} pt={3}>
                        <Typography variant="h6" component="div" ><FormattedMessage id="lyricsPlaylist.heading" /></Typography>
                    </Box>
                    <Box mr={4} pt={3}>
                        <Typography style={{ opacity: ".6", fontWeight: "600" }}   ><FormattedMessage id="lyricsPlaylist.dragInstruction" /></Typography>
                    </Box>
                </Grid>

                <Droppable droppableId="droppable">
                    {(provided,) => {
                        return (

                            <List dense={false} ref={provided.innerRef}>
                                {cart.length > 0 ? cart.map(({ title, composer, lyricist, content }, i) => {
                                    if (Array.isArray(content)) {
                                        content = content.join(",")

                                    }
                                    content = content.substring(0, 30)
                                    return (
                                        <Draggable key={i} draggableId={`${title}_${i}`} index={i}>
                                            {(provided, snapshot) => {
                                                return (
                                                    <ListItem
                                                        ContainerComponent="li"
                                                        ContainerProps={{ ref: provided.innerRef }}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}

                                                        key={i}>
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
                                                        <ListItemSecondaryAction />
                                                    </ListItem>
                                                )
                                            }}
                                        </Draggable>

                                    )
                                }) : <Grid
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    style={{ height: "100%" }}
                                >
                                    <NoDataSvg style={{ height: "100px", width: "100px" }} />

                                    <p style={{ fontWeight: "600", color: "grey" }} >
                                        <FormattedMessage id="lyricsTable.noData" />
                                    </p>
                                </Grid>}
                                {provided.placeholder}
                            </List>

                        )
                    }}
                </Droppable>
            </Paper>



        </Container >
    )
}
