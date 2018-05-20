import *  as React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
const Header = () => {
    return(
        <div>
            <header>
                <nav className = "Brand">
                <ul>
                    <li>
                        <Link to = "/"><h1><strong>Movies scout</strong></h1></Link>
                        <p>search any movie, anytime, anywhere</p>
                    </li>
                </ul>
                    
                </nav>

            </header>
        </div>
    );
}
export default Header;