import * as React from 'react';
import './SearchBar.css';

interface ISearchBarProps {
    inputChanged: (event: any) => void
};
const SearchBar = (props: ISearchBarProps) => {
    return(
        <div className = "SearchBar">
            <input type = "text" placeholder="Search Movies here..." onChange = { props.inputChanged}/>
            <button id = "submit" className="fa fa-search fa-2x" type="submit" />
        </div>

    );
}
export default SearchBar;