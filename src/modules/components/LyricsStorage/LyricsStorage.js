import { Avatar, Container, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper } from '@material-ui/core'
import React from 'react'
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { ReactComponent as NoDataSvg } from '../../../Images/noData.svg'
export default function LyricsStorage({ setPlayId, cart, handleDelete }) {

    return (
        <Container>
            <Paper elevation={3} style={{ marginBottom: "20px" }}>
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

            </Paper>
            <Paper elevation={3}  style={{ marginBottom: "20px" }} >
                <List dense={false} >
                    {cart.length > 0 ? cart.map(({ title, content }, i) => {
                        return (<ListItem key={i}>
                            <ListItemAvatar>
                                <Avatar>
                                    <MusicNoteIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={title}
                                secondary={content[0].substring(0, 9) + "..."}
                            />
                            <ListItemSecondaryAction>
                                <IconButton
                                    name={i}
                                    onClick={(e) => setPlayId(e)}
                                    edge="end" aria-label="delete">
                                    <PlayCircleFilledIcon />
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
