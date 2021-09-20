import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Popover,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import TranslateIcon from "@material-ui/icons/Translate";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function Navbar({ locale }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const handleSwitchRoute = (e) => {
    let selectedLang = e.currentTarget.dataset.value;
    console.log(selectedLang);
     let latestLocale = localStorage.getItem("locale");
    localStorage.setItem("locale", latestLocale === "en" ? "zh" : "en");
    history.push(`/${selectedLang}`);
    window.location.reload();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Container style={{ maxWidth: "100%", padding: "0px" }}>
      <Box m={2}>
        <Grid container justifyContent="space-between">
          <Box ml={1}>
            <Typography variant="h5">
              <FormattedMessage id="app.title" />
            </Typography>
          </Box>
          <Box mr={1}>
            <Button
              startIcon={<TranslateIcon />}
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handleClick}
              // onClick={handleSwitchRoute}
            >
              {locale === "en" ? "English" : "中文"}
            </Button>
          </Box>
        </Grid>
      </Box>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List
          component="nav"
          aria-label="main mailbox folders"
          style={{ width: "150px" }}
        >
          <ListItem button onClick={handleSwitchRoute} data-value="en">
            <ListItemText primary="English" />
          </ListItem>
          <ListItem onClick={handleSwitchRoute} button data-value="zh">
            <ListItemText primary="中文" />
          </ListItem>
        </List>
      </Popover>
    </Container>
  );
}
