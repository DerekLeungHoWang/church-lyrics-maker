import { Button, Container, Grid, Slider } from "@material-ui/core";
import React, { useState } from "react";
import Cropper from "react-easy-crop";
import styled from "styled-components";
import getCroppedImg from "./cropImage";
const minZoom = 0.4;
export default function EasyCrop({ cropper, setCropper,handleCroppedImage}) {


  const onCropChange = (crop) => {
    setCropper((state) => ({
      ...state,
      crop,
    }));
  };
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
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

//   const handleCroppedImage = async () => {
 
//     const croppedImage = await getCroppedImg(
//       cropper.imageSrc,
//       cropper.croppedAreaPixels
//     );
//     console.log("cropped image = ", croppedImage);

//     setCropper((state) => ({
//       ...state,
//       croppedImage,
//     }));
//   };

  const handleCancelCrop = () => {
    setCropper((state) => ({
      ...state,
      croppedImage: null,
    }));
  };

  return (
    <>
      
          <div style={{position:"relative",height:"100%",width:"auto"}}>
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
              style={
                {
                    containerStyle:{
                        width: '100%',
                        height: "70%",
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
        value={cropper.zoom}
        min={minZoom}
        max={3}
        step={0.1}
        aria-labelledby="Zoom"
        onChange={(e, zoom) => onZoomChange(zoom)}
           style={{width:"90%"}}
      />

            
    </Grid>
    <Grid>
    <Button  >Back</Button>
    <Button  onClick={handleCroppedImage}>Crop Image</Button>
    </Grid>
    
    </>
  );
}
