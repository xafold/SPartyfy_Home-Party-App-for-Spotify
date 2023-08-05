import React, { Component } from "react";
import Button from "@material-ui/core/Button"
import Grid from '@material-ui/core/Grid';
import { Typography } from "@material-ui/core";
import TextField  from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from "@material-ui/core/FormHelperText";
import { Link } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';
import { Collapse } from "@material-ui/core";
import {Alert} from "@material-ui/lab";



export default class CreateRoomPage extends Component {
static defaultProps = {
    votesToSkip: 2,
    guestCanPause: true,
    update: false,
    roomCode: null,
    updateCallback: () => {},
};

constructor(props) {
    super(props);
    this.state = {
    guestCanPause: this.props.guestCanPause,
    votesToSkip: this.props.votesToSkip,
    errorMsg: "",
    successMsg: "",
    };

    this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
    this.handleVotesChange = this.handleVotesChange.bind(this);
    this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
    this.handleUpdateButtonPressed = this.handleUpdateButtonPressed.bind(this);
}

handleVotesChange(e) {
    this.setState({
    votesToSkip: e.target.value,
    });
}

handleGuestCanPauseChange(e) {
    this.setState({
    guestCanPause: e.target.value === "true" ? true : false,
    });
}

handleRoomButtonPressed() {
// Fetch CSRF token from Django
    axios.get('/csrf_token')
        .then(response => {
        const csrfToken = response.data.csrfToken;
    // Create the request payload
        const data = {
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
    };
    // Make the Axios request with the CSRF token in the headers
    axios.post('/api/create-room', data, {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        }
    })
    .then((response) => {
        const room_Code= response.data["code"];
        console.log(room_Code);
        this.props.history.push('/room/' + room_Code);
    });
    });
}

handleUpdateButtonPressed() {
    // Fetch CSRF token from Django
        axios.get('/csrf_token')
            .then(response => {
            const csrfToken = response.data.csrfToken;
        // Create the request payload
            const data = {
            votes_to_skip: this.state.votesToSkip,
            guest_can_pause: this.state.guestCanPause,
            code:this.props.roomCode,
        };
        // Make the Axios request with the CSRF token in the headers
        axios.patch('/api/update-room', data, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            }
        })
        .then((response) => {
            if(response.status >= 200 && response.status < 300){
                this.setState({
                    successMsg: "Room Updated successfully!",
                });
            }else{
                this.setState({
                    errorMsg: "Error updating room....",
                });
            }
            this.props.updateCallback(); 
        });
        });
    }
renderCreateButtons() {
    return (
    <Grid container spacing={1}>
        <Grid item xs={12} align="center">
        <Button
            color="primary"
            variant="contained"
            onClick={this.handleRoomButtonPressed}
        >
            Create A Room
        </Button>
        </Grid>
        <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
        </Button>
        </Grid>
    </Grid>
    );
}

renderUpdateButtons() {
    return (
    <Grid item xs={12} align="center">
        <Button
        color="primary"
        variant="contained"
        onClick={this.handleUpdateButtonPressed}
        >
        Update Room
        </Button>
    </Grid>
    );
}

render() {
    const title = this.props.update ? "Update Room" : "Create a Room";

    return (
    <Grid container spacing={1}>
        <Grid item xs={12} align="center">
    <Collapse
        in={this.state.errorMsg != "" || this.state.successMsg != ""}
        >
        {this.state.successMsg != "" ? (
            <Alert
            severity="success"
            onClose={() => {
                this.setState({ successMsg: "" });
            }}
            >
            {this.state.successMsg}
            </Alert>
        ) : (
            <Alert
            severity="error"
            onClose={() => {
                this.setState({ errorMsg: "" });
            }}
            >
            {this.state.errorMsg}
            </Alert>
        )}
        </Collapse>
        </Grid>
        <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
            {title}
        </Typography>
        </Grid>
        <Grid item xs={12} align="center">
        <FormControl component="fieldset">
            <FormHelperText>
            <div align="center">Guest Control of Playback State</div>
            </FormHelperText>
            <RadioGroup
            row
            defaultValue={this.props.guestCanPause.toString()}
            onChange={this.handleGuestCanPauseChange}
            >
            <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
            />
            <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
            />
            </RadioGroup>
        </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
        <FormControl>
            <TextField
            required={true}
            type="number"
            onChange={this.handleVotesChange}
            defaultValue={this.state.votesToSkip}
            inputProps={{
                min: 1,
                style: { textAlign: "center" },
            }}
            />
            <FormHelperText>
            <div align="center">Votes Required To Skip Song</div>
            </FormHelperText>
        </FormControl>
        </Grid>
        {this.props.update
        ? this.renderUpdateButtons()
        : this.renderCreateButtons()}
    </Grid>
    );
}
}