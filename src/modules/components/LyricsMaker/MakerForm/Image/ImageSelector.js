import React from "react";
import {
  Grid,
  Button,
  Typography,
  TextField,
  Box,
  Paper,
  IconButton,
} from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import CancelIcon from "@material-ui/icons/Cancel";

export default function ImageSelector({
    setCropper,
  cropper,
  imageURL,
  handleChangeURL,
  confirmImageURL,
  selectFromUpload,
   
}) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ height: "80%" }}
    >
      <Box
        style={{
          width: "70%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {!cropper.imageSrc && <><Button
          color="secondary"
          variant="contained"
          component="label"
          style={{ alignSelf: "center" }}
          size="large"
          onChange={selectFromUpload}
        >
          Upload File
          <input type="file" hidden />
        </Button>
        <Box p={7}>
          <Typography>OR</Typography>
        </Box>

        <Grid container direction="row">
          <TextField
            //   error={errors.content ? true : false}
            //   helperText={errors.content}
            //   onBlur={handleBlur}
            size="medium"
            variant="outlined"
            id="standard-multiline-flexible"
            label={<FormattedMessage id="lyricsMaker.imageURL.label" />}
            //   style={{ width: "80%" }}
            fullWidth
            name="URL"
            onChange={handleChangeURL}
            value={imageURL}
          />
        </Grid></>}

        {cropper.imageSrc && (
          <Grid >
            <Paper style={{ position: "relative",padding:"20px" }} elevation={8}>
              <IconButton
              onClick={()=>setCropper(state=>({...state,imageSrc:null}))}
                aria-label="delete"
                style={{ position: "absolute", right: "-25px", top: "-25px" }}
              >
                <CancelIcon style={{fill:"black", fontSize:"30px"}} />
              </IconButton>
              <img
                alt="image"
                src={cropper.imageSrc}
                style={{ height: "250px", width: "100%" }}
              />
            </Paper>
          </Grid>
        )}
      </Box>
    </Grid>
  );
}
