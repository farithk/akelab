import React, { useState, useEffect } from "react";
import axios from 'axios';
import search from '../images/search.png';
import filter from '../images/filterIcon.png';
import arrow from '../images/arrow.png';
import "../styles/fibonacci.css"

const Fibonacci = () => {

    const [number, setNumber] = useState();

    const [serie, setSerie] = useState([1]);

    function fibonacci() 
    { 
        
        var num1=0; 
        var num2=1; 
        var sum; 
        var i=0; 
        let serieIn = [1];

        if (number - 1 == 0){
            console.warn(serieIn);
            setSerie(serieIn);
        } else {
            for (i = 0; i < number - 1; i++)  
            { 
                sum=num1+num2; 
                num1=num2; 
                num2=sum; 
                serieIn.push(num2);
                console.warn(serieIn);
                setSerie(serieIn);
            } 
        }

       
        
       
        return num2; 
    } 

      const handleInput = (e) =>{
        if (e.target.value != ""){
            setNumber(parseInt(e.target.value))
          } else {
            setNumber((""))
          }
      }

      useEffect(() => {
          setSerie([1])
         
      }, [])
     
  return (
    <div>

        <div className="fibonacciTitle">Type the qty of numbers for the Fibonacci Serie</div>
        <div>
            <input className="inputFibo" type="text" placeholder="1" onChange={handleInput} />
            <div className="buttonGenerate" onClick={fibonacci}>Generate</div>
        </div>

        <div className="fiboNumbersContainer">
        {serie ? 
        
        serie.map((genre, key) => (
            <div className="fiboNumbers" key={key}>
                <div>{genre}</div>
            </div>
        ))

    :""}
        </div>
      
    </div>
  );
};

export default Fibonacci;
