import { Avatar, Button, Container, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Typography } from '@material-ui/core'
import React from 'react'
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { ReactComponent as NoDataSvg } from '../../../Images/noData.svg'
import LyricsPlayer from '../LyricsPlayer/LyricsPlayer';
import GetAppIcon from '@material-ui/icons/GetApp';
import EditIcon from '@material-ui/icons/Edit';
export default function LyricsStorage({ setPlayId, cart, handleDelete, handleLoad, properties }) {

    return (
        <Container>

            <Paper elevation={3} style={{ position: "relative", marginBottom: "20px", borderRadius: "15px" }} >
                {cart.length > 0 && <div style={{ paddingBottom: "30px", paddingTop: '15px' }}>
                    <IconButton
                        href={`data:text/json;charset=utf-8,${encodeURIComponent(
                            JSON.stringify(cart)
                        )}`}
                        download="lyrics.json"
                        style={{
                            position: "absolute",
                            right: "1%"
                        }}   >
                        <GetAppIcon />
                    </IconButton>

                </div>}

                <List dense={false} >

                    {cart.length > 0 ? cart.map(({ title, content }, i) => {
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
                                            {`${title.split(',')[0]}`}</span>

                                    </Grid>
                                }
                                secondary={
                                    <Grid container component="span" >

                                        <Typography component="span" >
                                            {title.split(',')[1] ? title.split(',')[1] : ""}
                                        </Typography >
                                        <Typography component="span">
                                            {title.split(',')[2] ? title.split(',')[2] : ""}
                                        </Typography>


                                    </Grid>
                                }
                            />


                            <ListItemSecondaryAction>

                                <IconButton
                                    name={i}
                                    onClick={(e) => setPlayId(e)}
                                    edge="end" aria-label="play">
                                    <PlayCircleFilledIcon />
                                </IconButton>
                                <IconButton edge="end"
                                    name={i} aria-label="load"
                                    onClick={(e) => handleLoad(e)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end"
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
