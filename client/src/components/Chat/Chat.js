import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import ChatList from './chatList';

import { getChat, appendChat } from '../../actions/chat'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    }
});

const Chat = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const chatArray = useSelector(state => state.chat);
    const [chatData, setChatData] = useState({ from: '', message: '', timestamp: '' });
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        if (chatArray) setChatList([...chatArray]);
    }, [chatArray])

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:5000/notifications/response`)
        ws.onopen = (connection) => {
            console.log("Successfully Connected", connection)
        }
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            console.log(data);
            // if (data.type === 'message_response') {
            //     for (let message of data.messages) {
            //         console.log('Transcript (more accurate): ', message.payload.content);
            //     }
            // }
            // if (data.type === 'topic_response') {
            //     for (let topic of data.topics) {
            //         console.log('Topic detected: ', topic.phrases)
            //     }
            // }
        }
        ws.onerror = (err) => {
            console.error(err);
        };
        ws.onclose = () => {
        }
    }, [])
    // setInterval(function(){ 
    //     console.log('set')
    //     dispatch(getChat())
    //  }, 5000);   

    const handleChatSubmit = () => {
        console.log("chat submit", chatData);
        dispatch(appendChat(chatData))
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={12} >
                    <Typography variant="h5" className="header-message">Chat</Typography>
                </Grid>
            </Grid>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemIcon>
                                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="John Wick"></ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid item xs={12} style={{ padding: '10px' }}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                        <Button>Quit</Button>
                    </Grid>
                    <Divider />
                    <ChatList />
                </Grid>
                <Grid item xs={9}>
                    {chatList !== undefined ? (<List className={classes.messageArea}>
                        {chatList.map((data, index) => (
                            data.from === '919415552244' ?
                                (<ListItem key="1">
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <ListItemText align="right" primary={data.message}></ListItemText>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ListItemText align="right" secondary={data.timestamp}></ListItemText>
                                        </Grid>
                                    </Grid>
                                </ListItem>) : ''

                        ))}
                        {chatList.map((data, index) => (
                            data.from === '918928894215' ?
                                (
                                    <ListItem key="2">
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <ListItemText align="left" primary={data.message}></ListItemText>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ListItemText align="left" secondary={data.timestamp}></ListItemText>
                                            </Grid>
                                        </Grid>
                                    </ListItem>) : ''
                        ))}
                    </List>) : ''}
                    <Divider />
                    <Grid container style={{ padding: '20px' }}>
                        <Grid item xs={11}>
                            {/* <TextField id="outlined-basic-email" label="Type Something" fullWidth /> */}
                            <TextField id="outlined-basic-email" name="message" variant="outlined" label="Type Something" fullWidth onChange={(e) => setChatData({ from: '919415552244', message: e.target.value, timestamp: Date.now() })} />

                        </Grid>
                        <Grid xs={1} align="right">
                            <Fab color="primary" aria-label="add" onClick={handleChatSubmit}><SendIcon /></Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Chat;