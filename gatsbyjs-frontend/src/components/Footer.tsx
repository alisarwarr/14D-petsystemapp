import React from 'react';
//CONTEXT-API
import { useStateValue } from '../StateContext';

function Footer() {
    const [ { dark }, dispatch ] = useStateValue();
    
    return (
        <footer
            className="footer page-footer font-small stylish-color-dark pt-4"
            id={dark ? "darkRespectAll" : "lightRespectAll"}
        >
            <div className="footer-copyright text-center"> © 2021 Copyright:
                <a href="https://www.petfinder.com/" target="_blank" rel="noreferrer"> petfinder.com </a>
            </div>
        </footer>
    )
}

export default Footer;