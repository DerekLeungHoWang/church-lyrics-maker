import React, { useState } from "react";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import {
  IconButton,
  makeStyles,
  Popover,
  Typography,
  Slider,
  Paper,
} from "@material-ui/core";
import { pptConfigData } from "./PPTConfigData";

export default function PPTProperties({pptProperties,setPptProperties}) {
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const togglePPTSetting = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePropertyChange = (name) => (e, newValue) => {
    console.log(newValue);
    console.log(name);
    setPptProperties((state) => ({
      ...state,
      [name]: newValue,
    }));
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <IconButton onClick={togglePPTSetting}  >
        <SettingsApplicationsIcon  style={{fontSize:"30px"}} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Paper
          style={{
            width: "500px",
            height: "auto",
            padding: "50px",
            zIndex: "990",
          }}
        >
          {pptConfigData.map(
            ({ propLabel, propName, step, min, max, marks }, i) => {
              console.log(pptProperties[`${propName}`]);
              return (
                <React.Fragment key={i}>
                  <Typography
                    style={{
                      marginBottom: "40px",
                      fontWeight: "600",
                      fontSize: "15px",
                      valueLabel: { color: "white" },
                    }}
                  >
                    {propLabel}
                  </Typography>
                  <Slider
                    key={i}
                    value={pptProperties[`${propName}`]}
                    name={propName}
                    aria-label="Volume"
                    onChange={handlePropertyChange(propName)}
                    step={step}
                    marks={marks}
                    valueLabelDisplay="on"
                    min={min}
                    max={max}
                  />
                </React.Fragment>
              );
            }
          )}
        </Paper>
      </Popover>
    </>
  );
}
