import React, { Component } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import axios from 'axios';
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";
export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
            showSettings: false,
            spotifyAuthenticated: false,
            song: {},
            queue: {
                queue: [], // Initialize queue as an empty array
            },
        };
        this.roomCode = this.props.match.params.roomCode;
        this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
        this.updateShowSettings = this.updateShowSettings.bind(this);
        this.renderSettings = this.renderSettings.bind(this);
        this.renderSettingsButton = this.renderSettingsButton.bind(this);
        this.getRoomDetails = this.getRoomDetails.bind(this);
        this.authenticateSpotify = this.authenticateSpotify.bind(this);
        this.getCurrentSong = this.getCurrentSong.bind(this);
        this.getQueueSong = this.getQueueSong.bind(this);
        this.getRoomDetails();
    }

    componentDidMount() {
        this.interval = setInterval(this.getCurrentSong, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }



    getRoomDetails() {
        return fetch("/api/get-room" + "?code=" + this.roomCode)
            .then((response) => {
                if (!response.ok) {
                    this.props.leaveRoomCallback;
                    this.props.history.push("/");
                }
                return response.json();
            })
            .then((data) => {
                this.setState({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host,
                });
                if (this.state.isHost) {
                    this.authenticateSpotify();
                }
            });
    }
    authenticateSpotify() {
        fetch("/spotify/is-authenticated")
            .then((response) => response.json())
            .then((data) => {
                this.setState({ spotifyAuthenticated: data.status });
                console.log(data.status);
                if (!data.status) {
                    fetch("/spotify/get-auth-url")
                        .then((response) => response.json())
                        .then((data) => {
                            window.location.replace(data.url);
                        });
                }
            });
    }

    getCurrentSong() {
        fetch("/spotify/current-song")
            .then((response) => {
                if (!response.ok) {
                    return {};
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                const { id, time, duration, votes, votes_required, is_playing } = data;
                if (this.state.song.id == id) {
                    this.setState((prevState) => ({
                        song: {
                            ...prevState.song,
                            time,
                            duration,
                            votes,
                            votes_required,
                            is_playing,
                        },
                    }));
                } else {
                    this.setState({ song: data }, () => {
                        this.getQueueSong(); // Call getQueueSong when a new song is played
                    });
                }
            });
    }

    getQueueSong() {
        fetch("/spotify/get-queue")
            .then((response) => {
                if (!response.ok) {
                    return {};
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                this.setState({ queue: data });
            });
    }

    leaveButtonPressed() {
        // Fetch CSRF token from Django
        axios.get('/csrf_token')
            .then(response => {
                const csrfToken = response.data.csrfToken;
                // Create the request payload
                const data = {
                };
                // Make the Axios request with the CSRF token in the headers
                axios.post('/api/leave-room', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken,
                    }
                })
                    .then((_response) => {
                        this.props.leaveRoomCallback();
                        this.props.history.push("/");
                    });
            });
    }

    updateShowSettings(value) {
        this.setState({
            showSettings: value,
        })
    }

    renderSettings() {
        return (<Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <CreateRoomPage
                    update={true}
                    votesToSkip={this.state.votesToSkip}
                    guestCanPause={this.state.guestCanPause}
                    roomCode={this.roomCode}
                    updateCallback={this.getRoomDetails}
                />
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained"
                    color="secondary"
                    onClick={() => this.updateShowSettings(false)}
                >
                    Close
                </Button>
            </Grid>
        </Grid>
        );
    }

    renderSettingsButton() {
        return (
            <Grid item xs={12} align="center">
                <Button variant="contained"
                    color="primary"
                    onClick={() => this.updateShowSettings(true)}
                >
                    Settings
                </Button>
            </Grid>
        );
    }

    render() {
        if (this.state.showSettings) {
            return this.renderSettings();
        }
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Code: {this.roomCode}
                    </Typography>
                </Grid>
                <MusicPlayer
                    {...this.state.song}
                    roomCode={this.roomCode}
                />
                <ul className="queue">
                    {this.state.queue.queue.map((item, index) => (
                        <Typography key={item.track_id} variant="body1">
                            Name: {item.name}<br />
                            Artist: {item.artist}<br />
                            Album: {item.album}<br />
                            <img src={item.img_url} alt={`${item.name} Album Cover`} width="100" height="100" />
                            <br /><br />
                        </Typography>
                    ))}
                </ul>
                {this.state.isHost ? this.renderSettingsButton() : null}
                <Grid item xs={12} align="center">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.leaveButtonPressed}
                    >
                        Leave Room
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

