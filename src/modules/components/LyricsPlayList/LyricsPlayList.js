import { CircularProgress, Avatar, Box, Button, Container, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Typography } from '@material-ui/core'
import React, { useState } from 'react'
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
import pptxgen from "pptxgenjs";
import axios from 'axios';


export default function LyricsPlayList({ setPlayId, cart, handleDelete, properties }) {

    const [isGenerating, setIsGenerating] = useState(false)
    const ref = React.createRef();
    const createPPT = async () => {
        setIsGenerating(true)
        let cart = JSON.parse(localStorage.getItem('cart')) || []
        let pres = new pptxgen();
        let newCart = JSON.parse(JSON.stringify(cart))
        const imgList = []
        console.log("started adding");
        await Promise.all(newCart.map(async (d) => {
            if (d.img) {
                // console.log("d = ",d);
                let result = await axios.get(d.img, {
                    responseType: 'arraybuffer'
                })
                let image = Buffer.from(result.data, 'binary').toString('base64')
                image = `data:image/jpg;base64,${image}`
                imgList.push({
                    _id: d._id,
                    image
                })
            }
        }))
        console.log("imgList ", imgList);
        newCart.map((d, i) => {
            return imgList.map(img => {
                if (d.img && d._id == img._id) {
                    return d.img = img
                }
            })

        })
        console.log("newCart = ", newCart);

        newCart.map(d => {

            let slide = pres.addSlide()
            d.img.image && slide.addImage({ 
                data: d.img.image,   
                w:"100%",
                h:"100%",
                sizing: { 
                    w:"100%",
                    h:"20%",
                    type: "crop" 
            } });
            slide.addText(d.title, { x: '0', y: '0', w: '100%', h: '20%', align: 'center', valign: 'middle', color: "ffffff", });
            slide.background = { color: "#000000" };

            d.content.map(text => {

                let slide_2 = pres.addSlide();
                d.img.image && slide_2.addImage({ 
                    data: d.img.image,   
                    w:"100%",
                    h:"100%",
                    sizing: { 
                        w:"100%",
                        h:"20%",
                        type: "crop" 
                } });
                slide_2.addText(text, { x: '0', y: '0', w: '100%', h: '20%', align: 'center', valign: 'middle', color: "ffffff", })
                slide_2.background = { color: "#000000" };
            })
        })
        console.log("completed inserting");
        console.log("started writing");
        pres.writeFile({ fileName: "Sample Presentation.pptx" })
            .then(() => {
                console.log("completed writing");
                setIsGenerating(false)
            })
    }

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

                                    content = content ? content.substring(0, 30) : ""
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

                {cart.length > 0 && <ListItem style={{ height: "50px" }}>
                    <Button
                        style={{ position: "absolute", right: "3%", bottom: "25%", background:"#D04423" }}
                        variant="contained" color="secondary" onClick={createPPT} >
                        {isGenerating && <CircularProgress
                            size={18} style={{ marginRight: "10px" }} />}

                        Generate PowerPoint
                    </Button>
                </ListItem>}

            </Paper>



        </Container >
    )
}
