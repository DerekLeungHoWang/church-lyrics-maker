import {
  Grid,
  Button,
  Container,
  Modal,
  Paper,
  makeStyles,
  Typography,
  Divider,
  TextField,
  Box,
} from "@material-ui/core";
import axios from "axios";
import React, { useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import EasyCrop from "../EasyCrop/EasyCrop";
import ImageSelector from "./ImageSelector";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",

    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
  },
}));

export default function ImageUploader() {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
 const [imageURL,setImageURL] = useState("")

  console.log(selectedFile);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeURL=(e)=>{
      setImageURL(e.currentTarget.value)
  }

  const confirmImageURL= (e)=>{
    console.log(imageURL)
    setSelectedFile(imageURL)


  }


  return (
    <Grid container justifyContent="center" alignItems="center">
      <Button onClick={() => setOpen(!open)}>Upload an image</Button>
      <Modal
      hideBackdrop
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper
          style={{
            position: "relative",
            height: "100%",
            minWidth: "100%",
            padding: "15px",
          }}
        >
          <Typography variant="h6">Image Upload</Typography>
          <Divider style={{ width: "100%" }} />
          <EasyCrop selectedFile={selectedFile}/>
         {/* { !selectedFile &&  <ImageSelector 
          handleChangeURL={handleChangeURL}
          confirmImageURL={confirmImageURL}
          />}

          {selectedFile && <EasyCrop selectedFile={selectedFile}/>} */}
        </Paper>
      </Modal>
    </Grid>
  );
}
