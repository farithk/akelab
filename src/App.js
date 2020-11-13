import React, { useState, useEffect } from "react";
import Movies from './Movies/movies';
import Fibonacci from './Fibonacci/fibonacci';
import Numbers from './Numbers/numbers';

import './App.css';


const Dashboard = () => {

  const [option, setOption] = useState("movies");

  const optionToChoose = (e) => {
    console.warn(e.target.id);
    setOption(e.target.id)
  }
 
  return (
    <div style={option === "movies" ? {backgroundColor:"#ebeae8", paddingBottom:"30px"}:{backgroundColor:"#ebeae8", paddingBottom:"0px", height:"100vh"}}>
      <div className="selectionMain">
       
        <div className="selection" id="movies" onClick={optionToChoose} >Movie App</div>
        <div className="selection" id="fibonacci" onClick={optionToChoose} >Fibonacci</div>
        <div className="selection" id="numbers" onClick={optionToChoose} >Numbers</div>
        <a href="https://farithk.com/space/space.html" style={{textDecoration:"none"}} target="__blank">
        <div className="selection" id="numbers" onClick={optionToChoose} >Portfolio</div>
        </a>
        
      </div>

      <div >
      {
         option === "movies" ? <Movies />:null
       }
       {
         option === "fibonacci" ? <Fibonacci />:null
       }

       {
         option === "numbers" ? <Numbers />:null
       }
       
      </div>
        
       
     

    </div>
  );
};

export default Dashboard;
