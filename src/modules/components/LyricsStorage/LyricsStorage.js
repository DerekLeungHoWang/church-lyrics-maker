import { Avatar, Button, Container, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper } from '@material-ui/core'
import React from 'react'
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { ReactComponent as NoDataSvg } from '../../../Images/noData.svg'
import LyricsPlayer from '../LyricsPlayer/LyricsPlayer';
import GetAppIcon from '@material-ui/icons/GetApp';
import EditIcon from '@material-ui/icons/Edit';
export default function LyricsStorage({ setPlayId, cart, handleDelete, handleLoad, lyrics }) {
    // let lyricsId = +props.match.params.lyricsId
    // let data = cart.filter((d, i) => (i === lyricsId))[0]
    // let title = data.title.split(',')[0];
    // let author_1 = data.title.split(',')[1] ? data.title.split(',')[1] : ""
    // let author_2 = data.title.split(',')[2] ? data.title.split(',')[2] : ""

    return (
        <Container>
            {/* <Paper elevation={3} style={{ marginBottom: "20px" }}>
                <div style={{ padding: "20px" }}>
                    <h2>使用說明</h2>
                    <p>
                        STEP 1:在右方輸入資料, 在歌詞部份按ENTER鍵加入斷點
                    </p>
                   
                    <p>
                        STEP 2:按下"建立"按鈕
                    </p>
             
                    <p>
                        STEP 3:進入播放頁面, 以鍵盤左鍵及右鍵控制, 按下 F11/ESC 切換全螢幕
                    </p>
                </div>

            </Paper> */}
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
                                        <span style={{ paddingRight: "10px", fontWeight: lyrics.title === title ? "600" : "unset" }} >{`${title.split(',')[0]}`}</span>

                                    </Grid>
                                }
                                secondary={
                                    <Grid container  >
                                       
                                        <Grid container item xs={12}>
                                            <span style={{paddingRight:"5px"}}> {`${title.split(',')[1] ?? ""}`}</span>
                                            <span> {`${title.split(',')[2] ?? ""}`}</span>
                                        </Grid>
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
