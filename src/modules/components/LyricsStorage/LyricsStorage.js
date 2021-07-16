import { Avatar, Container, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper } from '@material-ui/core'
import React from 'react'
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import MusicNoteIcon from '@material-ui/icons/MusicNote';

export default function LyricsStorage({ cart, handleDelete }) {
    function generate(element) {
        return cart.map((value) =>
            React.cloneElement(element, {
                key: value,
            }),
        );
    }
    return (
        <Container>
            <Paper elevation={3} >
                <List dense={false}>
                    {cart.map(({ title, content }, i) => {
                        return (<ListItem key={i}>
                            <ListItemAvatar>
                                <Avatar>
                                    <MusicNoteIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={title}
                                secondary={content[0].substring(0, 9) + "..."}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                    <PlayCircleFilledIcon />
                                </IconButton>
                                <IconButton edge="end"
                                    name={i} aria-label="delete"
                                    onClick={(e) => handleDelete(e)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>)
                    })}
                </List>

            </Paper>
        </Container>
    )
}
