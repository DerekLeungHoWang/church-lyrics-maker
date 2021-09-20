import { Container, Grid } from "@material-ui/core";
import React from "react";

export default function Preview({ cropper, selectedFile }) {
  
  return (
    <Container maxWidth={false} style={{height:"100%"}}>
      <Grid container justifyContent="center" alignItems="center"style={{height:"70%"}} >
       
       <img
          src={cropper.croppedImage}
          alt="preview"
          style={{ height: "400px", width: "auto" ,border:"2px dashed black"}}
        />
       
      </Grid>
    </Container>
  );
}
