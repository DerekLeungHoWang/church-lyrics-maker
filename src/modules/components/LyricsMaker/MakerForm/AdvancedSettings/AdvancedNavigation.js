import React from 'react'
import { Container, Divider, Paper } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import styled from 'styled-components';
import SettingsIcon from '@material-ui/icons/Settings';
import TextFormatIcon from '@material-ui/icons/TextFormat';



const useStyles = makeStyles((theme) => ({
    container: {
        marginBottom: "40px"
    },
    list: {
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.background.paper,
        borderRadius: "10px",
        padding: '0px'
    },
    paper: {
        borderRadius: "10px",

    },
    // listItem: {
    //     borderLeft: props => {
    //         
    //     }
    // }
}));

const StyledListItem = styled(ListItem)`
     border-left: ${({ active, name, theme }) => active === name ? `2px solid #000` : "unset"};
     border-top-left-radius:${({ active, name, theme, firstsection }) => firstsection === name ? `8px` : "unset"};;
     border-bottom-left-radius:${({ active, name, theme, lastsection }) => lastsection === name ? `8px` : "unset"};;
  
`

const sections = [
    {
        name: "Text Control",
        icon: <TextFormatIcon />
    },
    {
        name: "Image Control",
        icon: <ImageIcon />
    },
    // {
    //     name: "Others",
    //     icon: <SettingsIcon />
    // },
]
export default function AdvancedNavigation({ active, handleSetActive }) {
    const theme = useTheme();
    const styleProps = {
        active: active
    };
    const classes = useStyles(styleProps);
    let firstSection = sections[0].name.toLowerCase().replace(/ /g, '')
    let lastSection = sections[sections.length - 1].name.toLowerCase().replace(/ /g, '')
    
    return (
        <Container className={classes.container}>
            <Paper elevation={3} className={classes.paper}>

                <List className={classes.list}>
                    {sections.map((s, i) => (
                        <div key={i}>
                            <StyledListItem firstsection={firstSection} lastsection={lastSection} theme={theme} active={active} name={s.name.toLowerCase().replace(/ /g, '')} button onClick={handleSetActive} className={classes.listItem}  >
                                <ListItemAvatar>
                                    <Avatar>
                                        {s.icon}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={s.name} />
                            </StyledListItem>
                            <Divider />
                        </div>
                    ))}


                </List>
            </Paper>
        </Container>
    )
}
