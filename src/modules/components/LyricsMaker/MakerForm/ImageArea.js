import { Button, CircularProgress, Container, Grid, List, ListItem, ListItemSecondaryAction, ListItemText, Modal, Paper, TextField } from '@material-ui/core'
import React, { useEffect } from 'react'
import useImage from '../../useImage';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
export default function ImageArea({ classes, setLyrics, lyrics

    // lastImg 
}) {
    let lyricsImg = lyrics.img
    const [rawImg, setRawImg, handleUpload, isLoading, uploadedImg] = useImage(setLyrics)
    const handleRemove = (e) => {
        setLyrics(state => ({
            ...state,
            img: ""
        }))
        setRawImg("")
    }
    return (
        <Grid
            style={{ margin: "10px 0px" }}
            justifyContent="center"
            alignItems="center"
            container item>

            <Container>
                <Paper elevation={5}>
                    <Grid
                        direction="row"
                        container justifyContent="center" alignContent="center">
                        <Grid container item lg={8} >
                            <List >
                                <ListItem>
                                    {lyricsImg && <img style={{ borderRadius: "5px" }} src={lyricsImg} alt="ad" width="100%" height="100%" />}

                                    {rawImg && !lyricsImg && <img style={{ borderRadius: "5px" }}
                                        src={rawImg} alt="ad" width="100%" height="100%" />}

                                    {!rawImg && !lyricsImg &&
                                        <Grid container justifyContent="center" >
                                            <span
                                                style={{ color: "#9E9E9E", fontWeight: 600 }}
                                            >WINDOW + SHIFT + S 選取圖片 <br/>
                                            </span>
                                            <span
                                                style={{ color: "#9E9E9E", fontWeight: 600 }}
                                            > CTRL + V 貼上圖片
                                            </span>
                                        </Grid>

                                    }

                                </ListItem>
                            </List>
                        </Grid>
                        {/* {lastImg &&
                            <Grid container item lg={4} direction="row" justifyContent="center" alignContent="center">
                                <Button onClick={handleRemove}  >移取</Button>
                            </Grid>} */}

                        {rawImg && !lyricsImg &&
                            <Grid container item lg={4} direction="row" justifyContent="center" alignContent="center">
                                <Button onClick={handleUpload}  >
                                    {isLoading && <CircularProgress
                                        size={18} style={{ marginRight: "10px" }} />}
                                    確定</Button>
                                <Button onClick={() => setRawImg("")} >取消</Button>
                            </Grid>}

                        {lyricsImg &&
                            <Grid container item lg={4}
                                direction="column"
                                justifyContent="center"
                                alignContent="center"
                                 
                            >
                                {/* <CheckCircleIcon style={{ marginLeft: "11px" }} /> */}
                                <Button 
                              size="large"
                                onClick={handleRemove}  >移除</Button>


                            </Grid>
                        }

                    </Grid>
                </Paper>
            </Container>



        </Grid>
    )
}
