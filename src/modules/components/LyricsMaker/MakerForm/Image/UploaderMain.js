import React, { useState, useEffect, useContext } from "react";

import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Grid,
  CircularProgress,
  Container
} from "@material-ui/core";
import ImageSelector from "./ImageSelector";
import EasyCrop from "../EasyCrop/EasyCrop";
import Preview from "./Preview";
import getCroppedImg from "../EasyCrop/ImgDialog";
import { storage } from "../../../../firebase";
import { PropertiesContext } from "../../../../context/PropertiesContext";
import { FormattedMessage } from "react-intl";

const steps = [
 <FormattedMessage id="lyricsMaker.uploader.step1"/>
,  <FormattedMessage id="lyricsMaker.uploader.step2"/>,
<FormattedMessage id="lyricsMaker.uploader.step3"/>];

export default function UploaderMain({
  handleChangeURL,
  confirmImageURL,
  selectFromUpload,
  cropper,
  setCropper,
  setOpenImageModal,
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [uploading, setUploading] = useState(false);
  const {
    properties,
    setProperties,
    // handleSetProperties,
    errors,
    setErrors,
    // handleBlur,
    // handleSmartSplit,
  } = useContext(PropertiesContext);

  const handleNext = async () => {
    if (activeStep == 0) {
      if (!cropper.imageSrc) {
          console.log(errors);
          setErrors(state=>({...state,imageSrc:"Please provide an image."}))
          return;
      }

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
  const handleUpload = async () => {
    setUploading(true);
    const response = await fetch(cropper.croppedImage);
    const blob = await response.blob();

    const uploadTask = storage.ref("images").child(properties.title).put(blob);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // setProgress(progress);
      },
      (error) => {},
      () => {
        storage
          .ref("images")
          .child(properties.title)
          .getDownloadURL()
          .then((url) => {
            // setIsLoading(false)
            //  setLoaded(false)

            setProperties((state) => ({
              ...state,
              img: url,
            }));
            setOpenImageModal(false);
            setUploading(false);
          });
      }
    );
  };

  const handleCroppedImage = async () => {
    const croppedImage = await getCroppedImg(
      cropper.imageSrc,
      cropper.croppedAreaPixels
    );

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
    <Container maxWidth={false}
     style={{position:"relative",height:"100%"}}
     >
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
      <Container   style={{ height: "100%" }}>
        {activeStep == 0 && (
          <ImageSelector
            setCropper={setCropper}
            cropper={cropper}
            selectFromUpload={selectFromUpload}
            handleChangeURL={handleChangeURL}
            confirmImageURL={confirmImageURL}
            errors={errors}
            setErrors={setErrors}
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
           style={{ position: "absolute", bottom: "1%", right: "1%" }}
        >
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            <FormattedMessage id="lyricsMaker.uploader.back.label"/>
          </Button>

          <Button disabled={uploading} onClick={handleNext}>
            {uploading && (
              <CircularProgress size={18} style={{ marginRight: "10px" }} />
            )}
            {activeStep === steps.length - 1 ? <FormattedMessage id="lyricsMaker.upload.label"/> : <FormattedMessage id="lyricsMaker.uploader.next.label"/>}
          </Button>
        </Grid>
      </Container>
    </Container>
  );
}
