import {
  CircularProgress,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import { ReactComponent as NoDataSvg } from "../../../Images/noData.svg";
import LyricsPlayer from "../LyricsPlayer/LyricsPlayer";
import GetAppIcon from "@material-ui/icons/GetApp";
import EditIcon from "@material-ui/icons/Edit";
import { Droppable, Draggable } from "react-beautiful-dnd";
import RootRef from "@material-ui/core/RootRef";
import { FormattedMessage } from "react-intl";
import pptxgen from "pptxgenjs";
import axios from "axios";
import { API_BASE_URL } from "../../constant";
import PPTConfig from "./PPTConfig/PPTProperties";

export default function LyricsPlayList({
  setPlayId,
  cart,
  handleDelete,
  properties,
}) {

  console.log(properties);
  const [pptProperties, setPptProperties] = useState({
    height: 30,
    fontSize: 30,
    color:properties.text.textColor
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const ref = React.createRef();
  const createPPT = async () => {
    setIsGenerating(true);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.map((d) => (d.pptProperties = pptProperties));

    axios({
      url: `${API_BASE_URL}/lyrics/ppt/create`, //your url
      method: "POST",
      responseType: "blob", // important,
      data: { cart },
    }).then((res) => {
      console.log("res = ,", res);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Lyrics.pptx"); //or any other extension
      document.body.appendChild(link);
      link.click();
      setIsGenerating(false);
    });
  };

  return (
    <Container maxWidth={false} style={{ padding: "0px" }}>
      <Paper
        elevation={3}
        style={{
          position: "relative",
          marginBottom: "20px",
          borderRadius: "18px",
        }}
      >
        <Grid container justifyContent="space-between">
          <Box ml={4} pt={3}>
            <Typography variant="h6" component="div">
              <FormattedMessage id="lyricsPlaylist.heading" />
            </Typography>
          </Box>

          <Box mr={4} pt={3}>
            <Typography style={{ opacity: ".6", fontWeight: "600" }}>
              <FormattedMessage id="lyricsPlaylist.dragInstruction" />
            </Typography>
          </Box>
        </Grid>

        <Droppable droppableId="droppable">
          {(provided) => {
            return (
              <List dense={false} ref={provided.innerRef}>
                {cart.length > 0 ? (
                  cart.map(({ title, composer, lyricist, content }, i) => {
                    if (Array.isArray(content)) {
                      content = content.join(",");
                    }

                    content = content ? content.substring(0, 30) : "";
                    return (
                      <Draggable
                        key={i}
                        draggableId={`${title}_${i}`}
                        index={i}
                      >
                        {(provided, snapshot) => {
                          return (
                            <ListItem
                              ContainerComponent="li"
                              ContainerProps={{ ref: provided.innerRef }}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              key={i}
                            >
                              <ListItemAvatar>
                                <Avatar>
                                  <MusicNoteIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <Grid container>
                                    <span
                                      style={{
                                        paddingRight: "10px",
                                        fontWeight:
                                          properties.title === title
                                            ? "600"
                                            : "unset",
                                      }}
                                    >
                                      {title}
                                    </span>
                                  </Grid>
                                }
                                secondary={
                                  <Grid container component="span">
                                    <Typography component="span">
                                      {content} ...
                                    </Typography>
                                  </Grid>
                                }
                              />

                              <IconButton
                                name={i}
                                onClick={(e) => setPlayId(e)}
                                aria-label="play"
                              >
                                <PlayCircleFilledIcon />
                              </IconButton>

                              <IconButton
                                name={i}
                                aria-label="delete"
                                onClick={(e) => handleDelete(e)}
                              >
                                <DeleteIcon />
                              </IconButton>
                              <ListItemSecondaryAction />
                            </ListItem>
                          );
                        }}
                      </Draggable>
                    );
                  })
                ) : (
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    style={{ height: "100%" }}
                  >
                    <NoDataSvg style={{ height: "100px", width: "100px" }} />

                    <p style={{ fontWeight: "600", color: "grey" }}>
                      <FormattedMessage id="lyricsTable.noData" />
                    </p>
                  </Grid>
                )}
                {provided.placeholder}
              </List>
            );
          }}
        </Droppable>

        {cart.length > 0 && (
          <ListItem style={{ height: "50px" }}>
            <Grid container justifyContent="flex-end" alignItems="center" style={{paddingRight:"6%",paddingBottom:"15px"}}  >
              <PPTConfig
                pptProperties={pptProperties}
                setPptProperties={setPptProperties}
              />
              <Button
                style={{
                  background: "#D04423",
                 
                }}
                variant="contained"
                color="secondary"
                onClick={createPPT}
                disabled={isGenerating}
              >
                {isGenerating && (
                  <CircularProgress
                    size={18}
                    style={{ marginRight: "10px", color: "white" }}
                  />
                )}
                <FormattedMessage id="lyricsPlaylist.createPPT" />
              </Button>
              </Grid>
            </ListItem>
         
        )}
      </Paper>
    </Container>
  );
}
