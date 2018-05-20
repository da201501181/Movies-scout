import axios from 'axios';
import * as React from 'react'

import Header from '../Header/Header';
import Spinner from '../UI/Spinner/Spinner';
import './ShowMovie.css'
const baseURL = " https://api.themoviedb.org/3/movie/";
class ShowMovie  extends React.Component<any, any>{
    
    state = {
        movie:{
            overview: '',
            poster_path:'',
            release_date: '',
            runtime: '',
            title:''
        },
        trailerKey: ''
    }
    componentDidMount(){
        let searchString: string = this.props.location.search;
        searchString = searchString.substring(4);
        const URL = baseURL + searchString+"?api_key=94f44c40acea9eb9e5478042d3c3dc64"; 
        window.console.log(URL);
        axios.get(URL)
        .then( response => {
            window.console.log(response.data);
            this.setState({movie: {...response.data}})
        }).catch(error => {
            window.console.log(error);
        });

        const videoURL = baseURL + searchString  + "/videos?api_key=94f44c40acea9eb9e5478042d3c3dc64";
        window.console.log(videoURL);
        axios.get(videoURL)
        .then( response => {
            window.console.log(response.data.results);
            this.setState({trailerKey: response.data.results[0].key});
        })
        .catch(error => {
            window.console.log(error);
        })
    }
    render(){
        window.console.log(this.state.movie.title);
        
        
    
        return(
            <div className="ShowMovie">
                <Header />
                    {this.state.movie.overview.length > 0  ?  <div className="show-container">
                        <div className="left">
                            <h2>{this.state.movie.title} </h2>
                            
                        <div className="show-poster">
                            <img className="poster-nohover" src= {"http://image.tmdb.org/t/p/w185"+ this.state.movie.poster_path} alt="" />
                        </div>
                        </div>
                        <div className="right">
                            <h3>Plot:</h3>{this.state.movie.overview}
                            <h3>Duration:  {this.state.movie.runtime}</h3>
                            <h3>Release Date: <span>{this.state.movie.release_date}</span></h3>
                            <h3>Trailer:</h3>
                            <iframe width="420" height="315" src={"https://www.youtube.com/embed/"+ this.state.trailerKey} />
                            
                        </div>
                    </div> : <Spinner />}
                   
            </div>
        );   
    }
   
}
export default ShowMovie;