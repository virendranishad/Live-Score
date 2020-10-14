
import React, { Fragment, useState } from 'react';
import './App.css';
import {useEffect} from 'react';
import MyCard from './components/MyCard';
import Navbar from './components/Navbar';
import {getMatches} from './api/Api';
import { Card, Typography,CardContent,CardActions,Button, Grid } from "@material-ui/core";
function App() {

  const [matches,setMatches]=useState([]);
  useEffect(() => {
      getMatches()
      .then((data)=>{
        setMatches(data.matches)
        console.log(data.matches)
      })
      .catch((error)=>alert("could not load data"));
    }, [])
  return (
    <div className="App">
      <Navbar></Navbar>
       <Typography variant="h4" style={{marginTop:20}}>Welcome to live score app</Typography>
       
         <Grid container>
         <Grid sm="2"></Grid>
          
         <Grid sm="8">
         {
            matches.map((match)=>(
           <Fragment>
             {
               match.type==="Twenty20" ?
               (<MyCard key={match.unique_id} match={match} />) :""
             }
           </Fragment>
         ))
           }
         </Grid>
         </Grid>
      
    </div>
  );
}

export default App;
