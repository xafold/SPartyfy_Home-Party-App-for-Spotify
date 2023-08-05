import React, { Component } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class RoomJoinPage extends Component{
    constructor(props){
        super(props);
        this.state={
            roomCode:"",
            error:"",
        };
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.roomButtonPressed = this.roomButtonPressed.bind(this);
    }
    render(){
        return(
            <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Join a Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField
                    error={this.state.error}
                    label="Code"
                    placeholder="Enter a Room Code"
                    value={this.state.roomCode}
                    helperText={this.state.error}
                    variant="outlined"
                    onChange ={this.handleTextFieldChange}
                />
            </Grid>
            <Grid item xs={12} align="center">
            <Button variant="contained" color="primary" onClick={this.roomButtonPressed}>
                    Enter Room
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="secondary" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
        )
    }

    handleTextFieldChange(e){
        this.setState({
            roomCode:e.target.value,
        })
    }

    roomButtonPressed(){
        axios.get('/csrf_token')
        .then(response => {
        const csrfToken = response.data.csrfToken;
      // Create the request payload
        const data = {
        code: this.state.roomCode,
    };
      // Make the Axios request with the CSRF token in the headers
    axios.post('/api/join-room', data, {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        }
    })
    .then((response) => {
            if(response.status >= 200 && response.status < 300){
                this.props.history.push(`/room/${this.state.roomCode}`);
            }else{
                this.setState({error:"Room not found."});
            }
    }).catch((error)=>{
        console.log(error);
    });
    });
    }
}