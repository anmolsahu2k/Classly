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
                <ChatListItem />
            </List>
        </>
    )
}

export default chatList
