import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
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
import moment from 'moment'

import { getChat, appendChat } from '../../actions/chat'
import { io } from "socket.io-client";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '90vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto',
        padding: '2rem 2rem'
    },
    leftBackground: {
        backgroundColor: '#e8e8e8'
    }
});

const Chat = () => {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const chatArray = useSelector(state => state.chat);
    const [chatData, setChatData] = useState({ from: '', message: '', timestamp: '' });
    const [message, setMessage] = useState("")
    const [chatList, setChatList] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem('profile')).result

    // useEffect(() => {
    //     if (chatArray) setChatList([...chatArray]);
    // }, [chatArray])
    // useEffect(() => {
    //     localStorage.setItem('chatData', JSON.stringify(chatList))
    // }, [chatList])
    const socket = io('wss://classly-elearning.herokuapp.com/', { transports: ['websocket'] });

    useEffect(() => {
        // dispatch(getChat())
        socket.on("connect", () => {
            console.log(socket.connected, "*******"); // true
        });
        socket.on("data", (data) => {
            console.log("****", data)
            let localChatData = JSON.parse(localStorage.getItem('chatData'))
            if (localChatData) {
                data.forEach((ele) => {
                    localChatData.push(ele)
                })
                localStorage.setItem('chatData', JSON.stringify(localChatData))

            }
            else {
                localStorage.setItem('chatData', JSON.stringify([data]))
            }
            setChatList(JSON.parse(localStorage.getItem('chatData')))
        })
        socket.on("disconnect", () => {
            console.log(socket.connected); // false
        });

    }, [])
    // setInterval(function(){ 
    //     console.log('set')
    //     dispatch(getChat())
    //  }, 5000);   

    const handleChatSubmit = () => {
        console.log("chat submit", chatData);
        setChatList([...chatList, chatData])
        dispatch(appendChat(chatData))
        setMessage("");
    }
    const handleQuitEvent = () => {
        socket.emit('end', () => {
            console.log("Connection Closed")
        })
        history.push('/home')
    }

    return (
        <div>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={`${classes.borderRight500} ${classes.leftBackground}`}>
                    <List>

                        <ListItem button key="RemySharp">
                            <ListItemIcon>
                                <Avatar alt="Remy Sharp" src="https://avatars.githubusercontent.com/u/54094722?v=4" />
                            </ListItemIcon>
                            <ListItemText primary={currentUser.name}></ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid item xs={12} style={{ padding: '10px' }}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                        <Button variant="contained" fullWidth style={{
                            marginTop: '2rem',
                            marginBottom: '2rem',
                            backgroundColor: "#c61717",
                            padding: "15px 36px",
                            fontSize: "18px",
                            color: 'white'
                        }} onClick={handleQuitEvent}>Quit</Button>
                    </Grid>
                    <Divider />
                    <ChatList />
                </Grid>
                <Grid item xs={9}>
                    {chatList !== undefined ? (<List className={classes.messageArea}>
                        {chatList.map((data, index) => (
                            data.from === currentUser.email ?
                                (<ListItem key={index}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Paper style={{alignItems: 'right', padding: '0.5rem 1rem', float: 'right', color: 'white', borderRadius: '5px', fontWeight: 'bold', backgroundColor: 'dodgerblue'}}>
                                            <ListItemText align="right" primary={data.message}></ListItemText>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ListItemText align="right" secondary={moment(data.timestamp).format("LT")}></ListItemText>
                                        </Grid>
                                    </Grid>
                                </ListItem>) : ''

                        ))}

                        {chatList.map((data, index) => (
                            data.from !== currentUser.email ?
                                (
                                    <ListItem key={index}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Paper style={{alignItems: 'right', padding: '0.5rem 1rem', float: 'right', color: 'white', borderRadius: '5px', fontWeight: 'bold', backgroundColor: 'white'}}>
                                                <ListItemText align="left" primary={data.message}></ListItemText>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ListItemText align="left" secondary={moment.unix(data.timestamp).format("LT")}></ListItemText>
                                            </Grid>
                                        </Grid>
                                    </ListItem>) : ''
                        ))}
                    </List>) : ''}
                    <Divider />
                    <Grid container style={{ padding: '20px' }}>
                        <Grid item xs={11}>
                            <TextField id="outlined-basic-email" value={message} name="message" variant="outlined" label="Type Something" fullWidth onChange={(e) => {setMessage(e.target.value); setChatData({ from: currentUser.email, message: e.target.value, timestamp: Date.now() })}} />
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