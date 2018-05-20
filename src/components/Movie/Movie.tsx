import * as React from 'react';
import {Link } from 'react-router-dom';
import './Movie.css';


const imgURL:string = "http://image.tmdb.org/t/p/w185";

class Movie extends React.Component<any> {
     

    render(){
        
        return(
            
                <li className="movie">
                    <Link  to = {{pathname: "/details", search: 'id='+this.props.movieDetails.id}}>
                        <div className="movie-content">
                            
                            <img className="poster" src={imgURL + this.props.movieDetails.poster_path} alt="" />
                            <h4><span className="title">{this.props.movieDetails.title}</span></h4>
                            
                        </div>
                    </Link>
                </li>
            

        );
    }
}
export default Movie;