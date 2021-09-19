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
import UploaderMain from "./UploaderMain";

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
const minZoom = 0.4;
export default function ImageUploader() {
  const classes = useStyles();
  const [openImageModal, setOpenImageModal] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [cropper, setCropper] = useState({
    imageSrc: "",
    crop: { x: 0, y: 0 },
    zoom: minZoom,
    aspect: 4 / 3,
    croppedAreaPixels: null,
    croppedImage: null,
  });


  const handleClose = () => {
    setOpenImageModal(false);
  };

  const handleChangeURL = (e) => {
    setCropper(state=>({
        ...state,
        imageSrc:e.currentTarget.value
    }))
  };
 

  const selectFromUpload = (e) => {
    setCropper(state=>({
        ...state,
        imageSrc:URL.createObjectURL(e.target.files[0])
    }))
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Button
        color="primary"
        style={{ marginTop: "10px" }}
        variant="outlined"
        onClick={() => setOpenImageModal(!openImageModal)}
      >
        Upload an image
      </Button>
      <Modal
        //hideBackdrop
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={openImageModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper
          style={{
            position: "relative",
            height: "90%",
            minWidth: "90%",
            padding: "15px",
          }}
        >
          <UploaderMain
            selectFromUpload={selectFromUpload}
            handleChangeURL={handleChangeURL}
            cropper={cropper}
            setCropper={setCropper}
            setOpenImageModal={setOpenImageModal}
          />
        </Paper>
      </Modal>
    </Grid>
  );
}
