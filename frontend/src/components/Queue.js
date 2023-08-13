import React, { useState, useEffect } from "react";
import { Card, CardMedia } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';

function Queue(props) {
    return (
        <Grid container alignItems="center">
            <div className="queue">
                {props.queue.map((item) => (
                    <Card key={item.track_id}>
                        <CardMedia component="img" alt={`${item.name} Album Cover`} height="140" image={item.img_url} />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.artist}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.album}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </Grid>
    );
}

export default Queue;
