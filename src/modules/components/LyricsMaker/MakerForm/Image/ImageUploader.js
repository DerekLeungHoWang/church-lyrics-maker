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
import React, { useContext, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { PropertiesContext } from "../../../../context/PropertiesContext";
import EasyCrop from "../EasyCrop/EasyCrop";
import ImageSelector from "./ImageSelector";
import UploaderMain from "./UploaderMain";
import ImageIcon from "@material-ui/icons/Image";


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
  const {
    properties,
    setProperties,
    handleSetProperties,
    errors,
    setErrors,
    handleBlur,
    handleSmartSplit,
  } = useContext(PropertiesContext);
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
    setCropper((state) => ({
      ...state,
      imageSrc: e.currentTarget.value,
    }));
  };

  const selectFromUpload = (e) => {
    setCropper((state) => ({
      ...state,
      imageSrc: URL.createObjectURL(e.target.files[0]),
    }));
  };
  const handleOpenUploadModal = () => {
    if (!properties.title) {
      setErrors((state) => ({
        ...state,
        title: "Title is required before upload",
      }));
      return;
    }

    setOpenImageModal(!openImageModal);
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Button
        color="primary"
        style={{ marginTop: "15px" }}
        variant="outlined"
        onClick={handleOpenUploadModal}
        startIcon={<ImageIcon />}
      >
       <FormattedMessage id="lyricsMaker.upload.label"/>
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
         
            height: "90%",
            width: "90%",
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
