import { Button, Container, Grid, Slider, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import getCroppedImg from "./cropImage";
const minZoom = 0.4;
export default function EasyCrop({ cropper, setCropper, handleCroppedImage }) {
  const onCropChange = (crop) => {
    setCropper((state) => ({
      ...state,
      crop,
    }));
  };
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCropper((state) => ({
      ...state,
      croppedAreaPixels,
    }));
  };

  const onZoomChange = (zoom) => {
    setCropper((state) => ({
      ...state,
      zoom,
    }));
  };

  const handleCancelCrop = () => {
    setCropper((state) => ({
      ...state,
      croppedImage: null,
    }));
  };

  return (
    <>
      <Grid container style={{ position: "relative", height: "100%" }}>
        <Cropper
          minZoom={minZoom}
          image={cropper.imageSrc}
          crop={cropper.crop}
          zoom={cropper.zoom}
          aspect={cropper.aspect}
          restrictPosition={false}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
          onZoomChange={onZoomChange}
          style={{
            containerStyle: {
              width: "100%",
              height: "70%",
              background: "#333",
            },
            cropAreaStyle: {},
          }}
        />
      </Grid>
     
       
        <Grid
          container
          direction="row"
          style={{
            width: "95%",

            position: "absolute",
            bottom: "1%",
          }}
        >
          <Typography>
            <FormattedMessage id="lyricsMaker.uploader.zoom" />
          </Typography>
          <Slider
            value={cropper.zoom}
            min={minZoom}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e, zoom) => onZoomChange(zoom)}
            style={{
              width: "85%",
              marginBottom: "5px",
              marginLeft: "10px",
              zIndex: 999,
            }}
          />
        </Grid>
      
    </>
  );
}
{/* <Grid container direction="row">
<Typography>
  {/* <FormattedMessage id="lyricsMaker.uploader.zoom" /> */}
  // Drag and Drop to reposition the image
// </Typography>
// </Grid> */}