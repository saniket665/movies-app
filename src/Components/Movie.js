import React, { Component } from 'react'
// import {movies} from "./getMovies";
import axios from "axios";

export default class Movie extends Component {
    constructor() {
        super();
        this.state={
            hover: "",
            pageCount: [1],
            currentPage: 1,
            movies: [],
            favorites: []
        }
    }

    async componentDidMount() {
        const res = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=e4d01fb745fb7495d4452329caa4c5de&language=en-US&page=${this.state.currentPage}`);
        let data = res.data;
        // console.log(data);
        this.setState({
            movies:[...data.results]
        })
        console.log("Mount");
    }

    changeMovies = async () => {
        console.log("change Called");
        console.log(this.state.currentPage);
        const res = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=e4d01fb745fb7495d4452329caa4c5de&language=en-US&page=${this.state.currentPage}`);
        let data = res.data;
        // console.log(data);
        this.setState({
            movies:[...data.results]
        })
    }

    handleRight=() => {
        let tempArr=[];
        for(var i = 1; i <= this.state.pageCount.length+1; i++) {
            tempArr.push(i);
        }
        this.setState({
            pageCount: [...tempArr],
            currentPage: this.state.currentPage+1
        }, this.changeMovies)   
    }

    handleLeft=()=>{
        if(this.state.currentPage != 1) {
            this.setState({
                currentPage: this.state.currentPage-1
            }, this.changeMovies)
        }
    }

    handleClick=(value)=>{
        if(value !== this.state.currentPage) {
            this.setState({
                currentPage: value
            }, this.changeMovies)
        }
    }

    handleFavourites=(singlemovie)=>{
        let oldData = JSON.parse(localStorage.getItem("movies-2") || "[]");
        if(this.state.favorites.includes(singlemovie.id)) {
            oldData = oldData.filter((m)=> m.id != singlemovie.id)
        }
        else {
            oldData.push(singlemovie);
        }
        localStorage.setItem("movies-2", JSON.stringify(oldData));
        this.changeFavourites();
    }

    changeFavourites=()=>{
        let oldData = JSON.parse(localStorage.getItem("movies-2") || "[]");
        let temp = oldData.map((single)=> single.id);
        this.setState({
            favorites: [...temp]
        })
        }

    render() {
        console.log("render");
        return (   
            <>
        {
            this.state.movies.length === 0 ? 
            <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>:
          <>
          <h2 className="text-center"><strong>Trending</strong></h2>
          <div className="movie-list">
              {
                  this.state.movies.map((movieObj) => (
                      <div class="card movie-card" onMouseEnter={()=> this.setState({hover: movieObj.id})} onMouseLeave={()=> this.setState({hover: ""})}>
                      <img src= {`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movie-img" alt={movieObj.title}/>
                      <h5 className="card-title movie-title">{movieObj.original_title}</h5>
                      <div className="button-wrapper" style={{display: "flex", width: "100%", justifyContent: "center"}}>
                      {this.state.hover === movieObj.id && <a class="btn btn-primary movie-btn" onClick='{()=>this.handleFavourites(movieObj)}'>{this.state.favorites.includes(movieObj.id)? "Remove from Favourites" : "Add to Favourites" }</a>}
                      </div>
                      </div>
                  ))
              }
              <div>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                    {this.state.pageCount.map((value) => (
                        <li class="page-item"><a class="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                        ))
                    }
                    <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                </ul>
            </nav>
              </div>
          </div>
          </>
          }
          </>
        )
    }
}
