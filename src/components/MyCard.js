import React, { Fragment, useState } from 'react';
import { Card, Typography,CardContent,CardActions,Button, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import { getMatchDetail } from "../api/Api";

const MyCard=({match})=>{
 const [detail,setDetail]=useState({});
 const [open,setOpen]=useState(false);

 const handleClose=()=>{
        setOpen(false)
}
const hadleOpen=()=>{
    setOpen(true)
}

    const handleClick=(id)=>{
        getMatchDetail(id).then(data=>{
            console.log("match data",data)
            setDetail(data);
            hadleOpen();
        })
        .catch(error=>console.log(error))
    }
    const getMatchCard=()=>{
        return(
        <Card style={{marginTop:20}}>
            <CardContent>
                <Grid container justify="center" alignItems="center" variant="h6" spacing="4">
                    <Grid item>
                        <Typography>{match["team-1"]}</Typography>
                    </Grid>
                    <Grid item>
                    <img style={{width:60}} src={require("../img/vs.png")} alt=" "/>
                        </Grid>
                        <Grid item>
                        <Typography>{match["team-2"]}</Typography>
                        </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Grid container justify="center">
                <Button onClick={()=>{
                    handleClick(match.unique_id)
                }}
                 item variant="contained" color="primary" >
                    Show Details
                </Button>
                <Button variant="contained" color="primary" spacing="2" style={{margin:5}}>
                    Start time{new Date(match.dateTimeGMT).toLocaleString()}
                </Button>
                </Grid>
            </CardActions>
        </Card>)
    }
    const getDialog=()=>(
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="alert-dialog-title">{"matchDetail"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography>{detail.state}</Typography>
                        <Typography>
                            match
                            <span style={{fontstyle:"italic",fontweight:"bold"}}>
                            {match.matchstarted?" match started":" still not started"}
                            {detail.score}
                            </span>
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                </DialogActions>
        </Dialog>
    )
    
    return (
        <Fragment>
            {getMatchCard()}
            {getDialog()}
        </Fragment>
    );
}

export default MyCard;