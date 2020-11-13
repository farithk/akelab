import React, { useState, useEffect } from "react";
import axios from 'axios';
import search from '../images/search.png';
import filter from '../images/filterIcon.png';
import arrow from '../images/arrow.png';
import "../styles/main.css"

const Movies = () => {

    const [data, setData] = useState(null);
    const [menuToShow, setMenuToShow] = useState();
    const [menuPointShow, setMenuPointShow] = useState();

    const [genres, setGenres] = useState();
    const [sorting, setSorting] = useState("average");

    const [find, setFind] = useState();
    
    const getData = () => {
        const article = { "akelab":"123456789" };
        axios.post("https://identidadtest.herokuapp.com/movies",  JSON.stringify(article), 
        { headers: { "Content-Type": "application/json; charset=UTF-8" }
        }).then(response => {
            setData(response.data);
   
        }) 
            
    }

    const handleGenreFilter = () => {
       
        setMenuToShow(!menuToShow);
        setMenuPointShow(false);
        let firstGenre = document.getElementById("28");
        firstGenre.checked = "true";
    }

    const handlePointsFilter = () => {
      
        setMenuPointShow(!menuPointShow);
        setMenuToShow(false);
    }

    const handleCheck = (e) =>{
        let res = genres;

        if (res.includes(parseInt(e.target.id))) {
            let del = res.indexOf(parseInt(e.target.id));
            res.splice(del, del+1);
            setGenres(res)
            console.warn(genres)
            getData();
        } else {
            res.push(parseInt(e.target.id))
            setGenres(res)
            console.warn(genres)
            getData();
        }
        
   
    }

    const handlePoints = (e) => {
        
        setSorting(e.target.id);
        getData();
    }

    const handleInputSearch = (e) => {
        
        setFind(e.target.value.toLowerCase());
        getData();
    }

    useEffect(() => {
        if (data === null) {
            getData();
            setMenuToShow(false)
            setMenuPointShow(false)
            setGenres([28]);
            setSorting("averageDesc");
            setFind("");

        } else {
            console.log(data)
        }
       
           
    }, [data])
        
    
 
  return (
    <div>

        <div className="titleMovies">Peliculas</div>

        {/*Header filters*/}  
        <div className="headerSearch">

            <div>
                <div className="searchMain">
                    <div>
                        <input className="searchMovie" placeholder="Filtra por Nombre" type="text" onChange={handleInputSearch}/>
                    
                    </div>
                    <div className="searchIcon"><img src={search} alt=""/></div>
                </div>
            </div>

            <div className="leftSearch">
                <div className="line"></div>

                <div className="filter" >
                    <img src={filter} alt="" onClick={handleGenreFilter}/>     
                </div>

                <div className="line"></div>

                <div className="orderTitle">Ordenar</div>
                <div className="arrow" onClick={handlePointsFilter}>
                    <img src={arrow} alt=""/>
                </div>
            </div>
          
            
        </div>


        {/*Genres Filter*/}  
        <div className="genresMainMenu" style={menuToShow ? {display:"block"}:{display:"none"}}>
            <p className="titleMenuGenre">Genero</p>
            {data ? 
        
                data.genres.map((genre, key) => (
                    <div className="genresBoxes" key={key}>
                        <div><input type="checkbox" id={genre.id} name={genre.name} onChange={handleCheck}  /></div>
                        <div>{genre.name}</div>
                    </div>
                ))
        
            :""}
            
        </div>

        {/*Date & points Filter*/}  
        <div className="genresPoints" style={menuPointShow ? {display:"block"}:{display:"none"}}>

            <div className="titlePoints"><strong>Fecha</strong> </div>
            <div className="subtitlePoints" id="yearDesc" onClick={handlePoints}>Nuevas - Antiguas</div>
            <div className="subtitlePoints" id="yearAsc" onClick={handlePoints}>Antiguas - Nuevas</div>

            <div className="titlePoints"><strong>Calificación</strong> </div>
            <div className="subtitlePoints" id="averageAsc" onClick={handlePoints}>0 - 10</div>
            <div className="subtitlePoints" id="averageDesc" onClick={handlePoints}>10 - 0</div>

        </div>

        <div className="moviesMain">
        {data ? 
        
        data.results.filter(item => {
            if (find !== ""){
                return item.title.toLowerCase().includes(find.toLowerCase())
            } else {
                return item.genre_ids.some(r=> genres.includes(r))
            }
            
        
        }).sort((a, b) => {
            if (sorting == 'averageDesc') {
              return b.vote_average - a.vote_average;
            }
            if (sorting == 'averageAsc') {
                return (- b.vote_average + a.vote_average);
            }

            if (sorting == 'yearDesc') {
                return parseInt(b.release_date.split("-")[0]) - parseInt(a.release_date.split("-")[0]);
            }
            if (sorting == 'yearAsc') {
                return (- parseInt(b.release_date.split("-")[0]) + parseInt(a.release_date.split("-")[0]));
            }

           
          }).map((movie, key) => (
            <div className="movieFilter" key={key}>
                <div className="titleMovieCard">
                    <div>{movie.title}</div>
                    <div style={{marginLeft:"5px"}}>({movie.release_date.split('-')[0]})</div>
                </div>
                <div className="movieDescription">
                    <div className="moviePosterContainer">
                        <img className="moviePoster" src={data.images_url + "" + movie.poster_path} alt=""/>
                    </div>
                    <div className="description">
                        <div style={{marginBottom:"30px"}}>{movie.overview.split(".")[0] + movie.overview.split(".")[1] + "."}</div>
                        <div className="subDescriptionMoviCard"><strong style={{color:"#008080"}}>Titulo: </strong> {movie.title}</div>
                        <div className="subDescriptionMoviCard"><strong style={{color:"#008080"}}>Calificación: </strong> {movie.vote_average}</div>

                        <div className="genresContainerCard">
                            <div style={{marginRight:"5px"}}><strong style={{color:"#008080"}}>Genero: </strong></div>
                            <div className="genresMovieCard"> {
                                data.genres.map((genre, key) => (
                                    <div key={key} style={movie.genre_ids.includes(genre.id) ? {display:"block"}:{display:"none"}}>
                                        <div className="genresWords">{genre.name}</div>
                                    </div>
                                ))
                                }
                            </div>
        
                        </div>
                            <div className="subDescriptionMoviCard"><strong style={{color:"#008080"}}>Fecha de realización: </strong>{movie.release_date}</div>
                    </div>
                </div>
               
            </div>
        ))

        :""}
        </div>
       
      
    </div>
  );
};

export default Movies;
