import axios from 'axios';
import * as React from 'react'

import MovieContainer from '../../components/MovieContainer/MovieContainer';
import SearchBar from '../../components/SearchBar/SearchBar';
import Spinner from '../../components/UI/Spinner/Spinner';

const searchBaseURL = "https://api.themoviedb.org/3/search/movie?api_key=94f44c40acea9eb9e5478042d3c3dc64&query=";
const popularBaseURL = "https://api.themoviedb.org/3/movie/popular?api_key=94f44c40acea9eb9e5478042d3c3dc64&page=";
class SearchMovie extends React.Component {

    state = {

        initialResults: [],
        initialResultsPageNo: 1,
        loadingOnScroll:false,
        query: '',
        queryResults: [],
        queryResultsPageNo: 1
    }
    inputChangedHandler = (event: React.FormEvent<HTMLInputElement>) => {
        
        window.console.log(event.currentTarget.value);
        if(event.currentTarget.value.length<2){
            this.setState({queryResults: [],  query: event.currentTarget.value})
            return;
        }
        this.setState({queryResultsPageNo: 1, loadingOnScroll: false, query: event.currentTarget.value},
        () => {
            const URL = searchBaseURL+this.state.query+"&page="+this.state.queryResultsPageNo;
        
            axios.get(URL)
            .then( response => {
                window.console.log(response.data.results);
                this.setState({queryResults: [...response.data.results]});
            }).catch( error => {
                window.console.log(error);
            });
        });
        
        
        // Using this was giving inconsistent results
       // const URL = searchBaseURL+event.currentTarget.value+"&page="+this.state.queryResultsPageNo;
        
       // axios.get(URL)
       // .then( response => {
           // this.setState({queryResults: [...response.data.results]});
       // }).catch( error => {
           // window.console.log(error);
       // });
    }
    componentDidMount() {
        window.console.log(this.props);
        const URL = popularBaseURL+this.state.initialResultsPageNo;
        axios.get(URL)
        .then( response => {
             this.setState({initialResults: [...response.data.results]});
        }).catch(error => {
            window.console.log(error);
        });
        
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount(){
        window.removeEventListener( 'scroll', this.handleScroll);
    }
    handleScroll = () => {
        if(this.state.initialResults.length>0 && window.innerHeight + window.scrollY > (document.body.offsetHeight) && !this.state.loadingOnScroll)
            {
                this.setState({loadingOnScroll: true});
                if(this.state.queryResults.length > 0){
                    const updatePageNo = this.state.queryResultsPageNo+1;
                    this.setState({queryResultsPageNo: updatePageNo});
                    this.getMoreQueryResults();
                }else{
                    const updatePageNo = this.state.initialResultsPageNo+1;
                    this.setState({initialResultsPageNo: updatePageNo});
                    this.getMoreInitialResults();
                }

                window.console.log("hi");
            }
    }
    getMoreInitialResults = () => {
        window.console.log(popularBaseURL+this.state.initialResultsPageNo);
        axios.get(popularBaseURL+this.state.initialResultsPageNo)
        .then( response => {
            window.console.log(response);
           const currInitialResults = this.state.initialResults;
           this.setState({initialResults: [...currInitialResults, ...response.data.results], loadingOnScroll: false});
            
        }).catch( error => {
            window.console.log(error);
        })
    }

    getMoreQueryResults = () => {
        const URL = searchBaseURL+this.state.query+"&page="+this.state.queryResultsPageNo;
        window.console.log(URL)
        axios.get(URL)
        .then( response => {
            const currQueryResults = this.state.queryResults;
            this.setState({queryResults: [...currQueryResults,...response.data.results],loadingOnScroll: false});
        }).catch( error => {
            window.console.log(error);
        });

    }

    render(){

    let IntialList = this.state.initialResults.length && this.state.query.length<2 ?  (<MovieContainer movies = {this.state.initialResults} />) : <Spinner />;
        if(this.state.queryResults.length > 0){
            IntialList = <MovieContainer movies = {this.state.queryResults} />;
        }
        if(this.state.query.length>2 && this.state.queryResults.length === 0){
            IntialList = <h1>No Results found</h1>
        }
        return(
            <div className = "SearchMovie" >
            
            <SearchBar inputChanged = {this.inputChangedHandler}/>
            {IntialList}
            </div>
        );
    }

     

}
export default SearchMovie;