import React from 'react';
//REACT-HELMET
import { Helmet } from 'react-helmet';
import { icon } from '../images';
//GATSBYJS
import { graphql, useStaticQuery } from 'gatsby';

interface HeadProps {
    title: string;
}

function Head({ title }: HeadProps) {
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
        <Helmet>
            <title> {`${title} | ${data.site.siteMetadata.AppName}`} </title>
            <link rel="shortcut icon" type='image/x-icon' href={icon}/>
        </Helmet>
    )
}

export default Head;