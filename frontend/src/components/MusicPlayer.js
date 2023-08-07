import { Grid, Typography, Card, IconButton, LinearProgress } from "@material-ui/core";
import React, {Component} from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import axios from 'axios';

export default class MusicPlayer extends Component {
    constructor(props){
        super(props);
    }

skipSong(){
        if (!this.props.userHasVoted) { 
        axios.get('/csrf_token')
        .then(response => {
        const csrfToken = response.data.csrfToken;
        const data = {};
        axios.post('/spotify/skip', data, {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
                }
            });
            this.props.updateUserVoted(true);
        });
    }
    }

    pauseSong(){
        axios.get('/csrf_token')
        .then(response => {
        const csrfToken = response.data.csrfToken;
        const data = {};
        axios.put('/spotify/pause', data, {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
                }
            });
        });
    }
    playSong(){
        axios.get('/csrf_token')
        .then(response => {
        const csrfToken = response.data.csrfToken;
        const data = {};
        axios.put('/spotify/play', data, {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
                }
            });
        });
    }

    render () {
        const songProgress = (this.props.time / this.props.duration) * 100 ;
        return (
        <Card>
            <Grid container alignItems="center">
                <Grid item align="center" xs={4}>
                    <img src={ this.props.image_url} height="100%" width="100%"/>
                </Grid>
                <Grid item align="center" xs={8}>
                    <Typography component="h5" variant="h5">
                        {this.props.title}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle1">
                        {this.props.artist}
                    </Typography>
                    <div>
                        <IconButton onClick={() => {
                            this.props.is_playing ? 
                            this.pauseSong() : 
                            this.playSong();
                            }}>
                            {this.props.is_playing ? <PauseIcon/> : <PlayArrowIcon/>}
                        </IconButton>
                        <IconButton onClick={()=> this.skipSong()}>
                            {this.props.votes} /{" "} 
                            {this.props.votes_required}<SkipNextIcon/> 
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <LinearProgress variant="determinate" value={songProgress} />
        </Card>
        );
    }
}