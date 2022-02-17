import React, { Component } from 'react'
import {movies} from "./getMovies"

export default class Banner extends Component {
    render() {
        let movie = movies.results[0];
        // console.log(movie)
        return (
            <>
            { movie === "" ? 
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>:
            <div class="card banner-card">
                <img src= {`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}  className="card-img-top banner-img" alt={movie.title}/>
                    <h3 className="card-title banner-title">{movie.original_title}</h3>
                    <p className="card-text banner-text">{movie.overview}</p>
            </div>
            }
            </>
        )
    }
}
