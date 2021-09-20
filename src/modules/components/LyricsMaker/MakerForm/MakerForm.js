import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormHelperText,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PublishIcon from "@material-ui/icons/Publish";
import FontSizeSlider from "./FontSizeSlider";
import ImageArea from "./ImageArea";
import { validator } from "./Validator";
import SettingsIcon from "@material-ui/icons/Settings";
import AdvancedSettings from "./AdvancedSettings/AdvancedSettings";
import gsap from "gsap";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import { FormattedMessage } from "react-intl";
import ImageUploader from "./Image/ImageUploader";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import FiberNewIcon from "@material-ui/icons/FiberNew";
const useStyles = makeStyles(
  (theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      position: "relative",
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }),
  { index: 1 }
);

export default function MakerForm({
  handleBlur,
  errors,
  setErrors,
  handleSubmit,
  properties,
  setProperties,
  setCart,
  isEditMode,
  setIsEditMode,
  loaded,
  setLoaded,
  submitting,
  loadingOne,
  handleSmartSplit,
}) {
  const formRef = useRef(null);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let lastSize = 60;
  let lastColor = "#fff";
  let lastImg = "";
  let contentValue = JSON.parse(JSON.stringify(properties.content));
  if (Array.isArray(contentValue)) {
    contentValue = contentValue.join("\n\n");
  }
  let countOfRows = contentValue.split(/\r*\n/).length;

  const inputFile = useRef(null);
  const classes = useStyles();

  const handleChange = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setIsEditMode(true);
    if (key === "title") {
      setIsEditMode(false);
    }

    setProperties((state) => ({
      ...state,
      [key]: value,
    }));
  };

  const handleUpload = () => {
    inputFile.current.click();
  };
  const handleFileChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      let cart = JSON.parse(e.target.result);
      setCart(cart);
    };
  };

  useEffect(() => {
    if (!loadingOne) {
      gsap.from(formRef.current, {
        duration: 0.5,
        opacity: 0,
        ease: "Power3.easeInOut",
      });
    }
  }, [loadingOne]);

  // const handleSmartSplit = () => {
  //     let content = properties.content
  //     content = content.map(d => {
  //         console.log(d);
  //     })

  // }

  return (
    <Container maxWidth={false}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        direction="row"
        style={{ padding: "20px 0px 0px 0px" }}
      >
        <Grid container item xs={3}>
          <Typography component="h6" variant="h6">
            <FormattedMessage id="lyricsMaker.heading" />
          </Typography>
        </Grid>

        <Grid
          container
          item
          direction="row"
          xs={9}
          justifyContent="flex-end"
          alignItems="center"
        >
          <AdvancedSettings />
          <Button
            style={{ marginLeft: "10px" }}
            startIcon={<DeleteSweepIcon />}
            variant="outlined"
            color="primary"
            onClick={() =>
              setProperties((state) => ({
                ...state,
                title: "",
                content: "",
                composer: "",
                lyricist: "",
                img: "",
              }))
            }
          >
            <FormattedMessage id="lyricsMaker.clear.label" />
          </Button>
        </Grid>
      </Grid>

      {loadingOne ? (
        <Grid
          container
          style={{ height: "800px" }}
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress size={58} style={{ marginRight: "20px" }} />
        </Grid>
      ) : (
        <form className={classes.form} onSubmit={handleSubmit} ref={formRef}>
          <TextField
            onBlur={handleBlur}
            error={errors.title ? true : false}
            helperText={errors.title}
            variant="outlined"
            margin="normal"
            fullWidth
            id="title"
            label={<FormattedMessage id="lyricsMaker.songName.label" />}
            name="title"
            autoComplete="title"
            onChange={handleChange}
            value={properties.title}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder=""
          />
          <Box mb={2}>
            <Grid
              container
              item
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={3}
            >
              <Grid
                container
                item
                direction="row"
                justifyContent="center"
                alignItems="center"
                xs={6}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  name="composer"
                  label={<FormattedMessage id="lyricsMaker.composer.label" />}
                  id="cardCvc"
                  value={properties.composer}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid
                container
                item
                direction="row"
                justifyContent="center"
                alignItems="center"
                xs={6}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  name="lyricist"
                  label={<FormattedMessage id="lyricsMaker.lyricist.label" />}
                  id="lyricist"
                  value={properties.lyricist}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          <div style={{ position: "relative" }}>
            <TextField
              error={errors.content ? true : false}
              helperText={errors.content}
              onBlur={handleBlur}
              fullWidth
              variant="outlined"
              id="standard-multiline-flexible"
              label={<FormattedMessage id="lyricsMaker.content.label" />}
              multiline
              rows={16}
              name="content"
              value={contentValue}
              onChange={handleChange}
              autoComplete="content"
            />
            <Tooltip
              title={<FormattedMessage id="lyricsMaker.flash.tooltip" />}
              aria-label="add"
            >
              <IconButton
                onClick={handleSmartSplit}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: countOfRows > 16 ? "35px" : "10px",
                }}
              >
                <FlashOnIcon />
              </IconButton>
            </Tooltip>
          </div>
          {/* <ImageArea
                        classes={classes}
                        properties={properties}
                        setProperties={setProperties}
                        setErrors={setErrors}
                        errors={errors}
                        loaded={loaded}
                        setLoaded={setLoaded}
                    /> */}

          <ImageUploader />
          <Grid container justifyContent="center">
            <Button
              color="primary"
              disabled={submitting}
              // size="large"
              type="submit"
              variant="outlined"
              style={{
                marginTop: "15px",
                marginBottom: "15px",
              }}
              startIcon={<FiberNewIcon />}
            >
              {submitting && (
                <CircularProgress size={18} style={{ marginRight: "10px" }} />
              )}
              <FormattedMessage id="lyricsMaker.submit.label" />
            </Button>
          </Grid>
          {properties.img && (
            <Paper
              elevation={3}
              style={{
                marginTop: "10px",
                position: "relative",
                padding: "20px",
                 
              }}
            >
              {!loaded && properties.img && (
                <Grid container alignItems="center" justifyContent="center">
                  <CircularProgress />
                </Grid>
              )}
              <IconButton
                onClick={() =>
                  setProperties((state) => ({ ...state, img: "" }))
                }
                aria-label="delete"
                style={{ position: "absolute", right: "-25px", top: "-25px" }}
              >
                <CancelIcon style={{ fill: "black", fontSize: "30px" }} />
              </IconButton>
              <Grid container alignItems="center" justifyContent="center">
                <img
                  src={properties.img}
                  alt="img"
                  style={{
                    height: "50%",
                    width: "100%",
                    display: loaded ? "unset" : "none",
                  }}
                  onLoad={() => setLoaded(true)}
                />
              </Grid>
            </Paper>
          )}
        </form>
      )}
    </Container>
  );
}
