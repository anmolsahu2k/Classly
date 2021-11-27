import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import ChatListItem from './chatListItem'

const chatList = () => {
    return (
        <>
            <List>
                <ListItem button key="RemySharp">
                    <ListItemIcon>
                        <Avatar alt="Remy Sharp" src="https://avatars.githubusercontent.com/u/53134103?v=4" />
                    </ListItemIcon>
                    <ListItemText primary="Anmol Sahu">Anmol Sahu</ListItemText>
                    <ListItemText secondary="online" align="right"></ListItemText>
                </ListItem>
                <ListItem button key="Alice">
                    <ListItemIcon>
                        <Avatar alt="Alice" src="https://avatars.githubusercontent.com/u/54502059?v=4" />
                    </ListItemIcon>
                    <ListItemText primary="Abhinav">Abhinav</ListItemText>
                </ListItem>
                <ListItem button key="CindyBaker">
                    <ListItemIcon>
                        <Avatar alt="Rindy Baker" src="https://material-ui.com/static/images/avatar/1.jpg" />
                    </ListItemIcon>
                    <ListItemText primary="Raj">Raj</ListItemText>
                </ListItem>
            </List>
        </>
    )
}

export default chatList
