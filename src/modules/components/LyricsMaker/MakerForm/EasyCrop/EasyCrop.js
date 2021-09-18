import { Button, Container, Grid, Slider } from "@material-ui/core";
import React, { useState } from "react";
import Cropper from "react-easy-crop";
import styled from "styled-components";
import getCroppedImg from "./cropImage";
const minZoom = 0.4;
export default function EasyCrop() {
  const [state, setState] = useState({
    imageSrc:
      "https://ae01.alicdn.com/kf/HTB1AboSJFXXXXXZXpXXq6xXFXXX8/New-6-5x10ft-Studio-Photo-Backdrop-Screen-Hot-Selling-Green-Nature-Landscape-Photography-Wedding-Portrait-Background.jpg_640x640.jpg",
    crop: { x: 0, y: 0 },
    zoom: minZoom,
    aspect: 4 / 3,
    croppedAreaPixels: null,
    croppedImage: null,
  });
  const onCropChange = (crop) => {
    setState((state) => ({
      ...state,
      crop,
    }));
  };
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    setState((state) => ({
      ...state,
      croppedAreaPixels,
    }));
  };

  const onZoomChange = (zoom) => {
    setState((state) => ({
      ...state,
      zoom,
    }));
  };

  const showCroppedImage = async () => {
    console.log("croppedAreaPixels = ", state);
    const croppedImage = await getCroppedImg(
      state.imageSrc,
      state.croppedAreaPixels
    );
    console.log("cropped image = ", croppedImage);

    setState((state) => ({
      ...state,
      croppedImage,
    }));
  };

  const handleCancelCrop = () => {
    setState((state) => ({
      ...state,
      croppedImage: null,
    }));
  };

  return (
    <>
      {state.croppedImage ? (
        <>
          <img
            alt="a"
            src={state.croppedImage}
            style={{ maxHeight: "300px", maxWidth: "300px" }}
          />
          <Grid
            container
            direction="row"
            style={{
              width: "95%",

              position: "absolute",
              bottom: "1%",
            }}
          >
            <Button onClick={handleCancelCrop}>Cancel</Button>
            <Button>Upload</Button>
          </Grid>
        </>
      ) : (
        <>
          <div style={{position:"relative",height:"100%",width:"auto"}}>
            <Cropper
              minZoom={minZoom}
              image={state.imageSrc}
              crop={state.crop}
              zoom={state.zoom}
              aspect={state.aspect}
              restrictPosition={false}
              onCropChange={onCropChange}
              onCropComplete={onCropComplete}
              onZoomChange={onZoomChange}
              style={
                {
                    containerStyle:{
                        width: '100%',
                        height: 500,
                        background: '#333',
                    },
                    cropAreaStyle:{
                            
                    }
                }
              }
            />
          </div>

          <Grid container direction="row" style={{
        width:"95%",

         position:"absolute",bottom:"1%"}} >
         <Slider
        value={state.zoom}
        min={minZoom}
        max={3}
        step={0.1}
        aria-labelledby="Zoom"
        onChange={(e, zoom) => onZoomChange(zoom)}
           style={{width:"90%"}}
      />

             <Button  onClick={showCroppedImage}>Show Image</Button>
    </Grid>
        </>
      )}
    </>
  );
}
