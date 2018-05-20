import * as React from 'react';
import Movie from '../Movie/Movie';
class MovieContainer extends React.Component<any> {
    handleClick = (movie:any) => {
        window.console.log("l");
        
    }
    render(){

        return(
            <div>
                <section id="movies-container" >
                    <ul style={{display:"flex", alignItems: "baseline",flexWrap: "wrap", flexDirection: "row"}}>
                    
                    {
                       
                        this.props.movies.map((movie:any) => {
                        // elminiate movies which doesn't have poster
                        if(movie.poster_path){

                            // tslint:disable-next-line jsx-no-lambda
                            return <Movie movieDetails={movie}  key={movie.id}/>
                        }else{
                            return;
                        }
                       
                    })}
    
                    </ul>
                </section>
            </div>
        );
    
    }
    
}
export default MovieContainer;