import React from 'react';
//MATERIAL-UI
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
//IMAGES
import { icon } from '../images';
//CONTEXT-API
import { useStateValue } from '../StateContext';
//GATSBYJS
import { graphql, useStaticQuery, navigate } from 'gatsby';

function Header() {
    const [ { dark }, dispatch ] = useStateValue();
    const screen700 = useMediaQuery('(max-width:700px)');

    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    AppName
                }
            }
        }
    `);

    return (
        <AppBar
            elevation={0}
            className="header"
            id={dark ? "darkRespectAll" : "lightRespectAll"}
        >
            <Toolbar className="toolbar">
                <Typography className="toolbar_heading" onClick={() => window.location.pathname === '/' ? null : navigate('/')}>
                    <img
                        className="toolbar_heading_img"
                        src={icon}
                    />                
                    <span> {data.site.siteMetadata.AppName} </span>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;