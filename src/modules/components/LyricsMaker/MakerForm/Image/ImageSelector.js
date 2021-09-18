import React from "react";
import {
    Grid,
    Button,
    Typography,
    TextField,
    Box,
  } from "@material-ui/core";
  import { FormattedMessage } from "react-intl";

export default function ImageSelector({imageURL,handleChangeURL,confirmImageURL}) {
  return (
     
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ height: "100%" }}
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
          <Button
            color="secondary"
            variant="contained"
            component="label"
            style={{ alignSelf: "center" }}
            size="large"
          >
            Upload File
            <input type="file" hidden />
          </Button>
          <Box p={3}>
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
              style={{ width: "80%" }}
              name="URL"
              onChange={handleChangeURL}
              value={imageURL}
              //onChange={handleChange}
            />
            <Button
              color="secondary"
              variant="contained"
              component="label"
              style={{ marginLeft: "5px" }}
              size="large"
              onClick={confirmImageURL}
            >
              Confirm
            </Button>
          </Grid>
        </Box>
      </Grid>
   
  );
}
