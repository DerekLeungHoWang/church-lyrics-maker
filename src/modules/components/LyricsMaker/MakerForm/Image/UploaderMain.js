import React, { useState, useEffect, useContext } from "react";

import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import ImageSelector from "./ImageSelector";
import EasyCrop from "../EasyCrop/EasyCrop";
import Preview from "./Preview";
import getCroppedImg from "../EasyCrop/ImgDialog";
import { storage } from "../../../../firebase";
import { PropertiesContext } from "../../../../context/PropertiesContext";


const steps = ["Select an image", "Crop the image", "Preview & Upload"];

export default function UploaderMain({
  handleChangeURL,
  confirmImageURL,
  selectFromUpload,
  cropper,
  setCropper,
  setOpenImageModal
 
}) {
    
  const [activeStep, setActiveStep] = useState(0);
  const {
    properties,
    setProperties,
    // handleSetProperties,
    // errors,
    // setErrors,
    // handleBlur,
    // handleSmartSplit,
  } = useContext(PropertiesContext);

  const handleNext = async () => {
    if (activeStep == 0) {
      setCropper((state) => ({
        ...state,
        imageSrc: cropper.imageSrc,
      }));
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    if (activeStep == 1) {
      handleCroppedImage();
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    if (activeStep == 2) {
   
      handleUpload();
    }
  };
//UPLOAD
  const handleUpload=async()=>{
    const response = await fetch(cropper.croppedImage)
    const blob = await response.blob();
    console.log("response => ",response)
    console.log("blob => ", blob)
   const uploadTask = storage.ref('images').child("testImage")
    .put(blob)

   
    console.log("----> ",properties)
    console.log("---=======->] ",cropper.croppedImage)


    uploadTask.on(
        "state_changed",
        snapshot => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
           // setProgress(progress);
        },
        error => {
            
        },
        () => {
            storage
                .ref("images")
                .child("testImage")
                .getDownloadURL()
                .then(url => {
                    // setIsLoading(false)
                    //  setLoaded(false)
                    console.log("res ====> " , url)
                    setProperties(state => ({
                        ...state,
                        img: url
                    }))
                    setOpenImageModal(false)
                 
                });
        }
    );

  }

  const handleCroppedImage = async () => {
    console.log("cropping....");
    const croppedImage = await getCroppedImg(
      cropper.imageSrc,
      cropper.croppedAreaPixels
    );
    console.log("cropped image = ", croppedImage);

    setCropper((state) => ({
      ...state,
      croppedImage,
    }));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <>
        {activeStep == 0 && (
          <ImageSelector
          setCropper={setCropper}
            cropper={cropper}
            selectFromUpload={selectFromUpload}
            handleChangeURL={handleChangeURL}
            confirmImageURL={confirmImageURL}
          />
        )}
        {activeStep == 1 && (
          <EasyCrop
            handleCroppedImage={handleCroppedImage}
            
            cropper={cropper}
            setCropper={setCropper}
          />
        )}
        {activeStep == 2 && <Preview cropper={cropper} />}

        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItem="center"
          style={{ position: "absolute", bottom: "3%", right: "1%" }}
        >
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>

          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Upload" : "Next"}
          </Button>
        </Grid>
      </>
            
    </Box>
  );
}
