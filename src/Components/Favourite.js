import React, { Component } from 'react'
import {movies} from "./getMovies";

export default class Favourite extends Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            currentGenre: "All Genres",
            genres: [],
            currentText:'',
            limit: 5,
            currentPage: 1
        }
    }
    componentDidMount() {
        let genreIds = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        let data = JSON.parse(localStorage.getItem("movies-2") || "[]");
        // console.log(data);
        let temp = [];
        data.forEach((single)=>{
            if(!temp.includes(genreIds[single.genre_ids[0]])) {
                temp.push(genreIds[single.genre_ids[0]]);
            }
        })
        temp.unshift("All Genres");
        this.setState({
            movies: [...data],
            genres: [...temp]
        })
    }

    changeGenre=(single)=>{
            this.setState({
                currentGenre: single,
                currentPage: 1
            })
    } 
    
    sortPopularityDescending=()=>{
        let temp = this.state.movies;
        temp.sort(function(obj1, obj2) {
            return obj2.popularity - obj1.popularity;
        })
        this.setState({
            movies: [...temp]
        })
    }

    sortPopularityAscending=()=>{
        let temp = this.state.movies;
        temp.sort(function(obj1, obj2) {
            return obj1.popularity - obj2.popularity;
        })
        this.setState({
            movies: [...temp]
        })
    }

    sortRatingsDescending=()=>{
        let temp = this.state.movies;
        temp.sort(function(obj1, obj2) {
            return obj2.vote_average - obj1.vote_average;
        }) 
        this.setState({
            movies: [...temp]
        })
    }

    sortRatingsAscending=()=>{
        let temp = this.state.movies;
        temp.sort(function(obj1, obj2) {
            return obj1.vote_average - obj2.vote_average;
        })
        this.setState({
            movies: [...temp]
        })
    }

    handlePageChange=(page)=>{
            this.setState({
                currentPage: page
            })
    }

    handleDelete=(deleteObj)=>{
        let temp = this.state.movies;
        temp = temp.filter((movie) => movie.id != deleteObj.id); 
        this.setState({
            movies: [...temp]
        })
        localStorage.setItem("movies-2", JSON.stringify(temp));
    }

    render() {
        let genreIds = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        let filterArr = [];
        if(this.state.currentText === '') {
            filterArr = this.state.movies;
        }
        else {
            filterArr=this.state.movies.filter((movieObj)=>{
                let title = movieObj.original_title.toLowerCase();
                return title.includes(this.state.currentText.toLowerCase())
            })
        }

        if(this.state.currentGenre != "All Genres") {
            filterArr=this.state.movies.filter((single) => genreIds[single.genre_ids[0]] === this.state.currentGenre);
        }

        let pages = Math.ceil(filterArr.length/this.state.limit);
        let pageArr = [];
        for(let i = 1; i <= pages; i++) {
            pageArr.push(i);
        }
        let si = (this.state.currentPage-1)*this.state.limit;
        let li = si + this.state.limit;
        filterArr = filterArr.slice(si, li);

        return (
            <div className="row">
                <div className="favourite-genres col-lg-3 col-sm-12">
                <ul class="list-group">
                    {
                        this.state.genres.map((single)=>(
                            this.state.currentGenre === single ? 
                            <li className="list-group-item" style={{background: "#0d6efd", color: "white", fontWeight: "bold"}}>{single}</li>:
                            <li className="list-group-item" style={{color: "#0d6efd"}} onClick={()=>this.changeGenre(single)}>{single}</li>
                        ))
                    }
                </ul>
                </div>
                <div className="favourite-table col-lg-9 col-sm-12">
                    <div className="row">
                    <input type="text" className="input-group-text col" placeholder="Search" value={this.state.currentText} onChange={(e)=>this.setState({currentText: e.target.value})} />
                    <input type="number" className="input-group-text col" placeholder="Rows Count" value={this.state.limit} onChange={(e)=>this.setState({limit: e.target.value})}/>
                    </div>
                    <div className="row">
                        <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Genre</th>
                                <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortPopularityDescending}></i> Popularity <i class="fa-solid fa-sort-down" onClick={this.sortPopularityAscending}></i></th>
                                <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortRatingsDescending}></i> Rating <i class="fa-solid fa-sort-down" onClick={this.sortRatingsAscending}></i></th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                filterArr.map((movie)=>(
                                    <tr>                                                    
                                        <td><img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} style={{width:'5rem'}}/> {movie.original_title}</td>
                                        <td>{genreIds[movie.genre_ids[0]]}</td>
                                        <td>{movie.popularity}</td>
                                        <td>{movie.vote_average}</td>
                                        <td><button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(movie)}>Danger</button></td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            {
                                pageArr.map((page) => (
                                    <li class="page-item"><a class="page-link" onClick={()=>this.handlePageChange(page)}>{page}</a></li>
                                ))
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}
