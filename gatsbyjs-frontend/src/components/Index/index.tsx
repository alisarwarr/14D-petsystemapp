import React from 'react';
//COMPONENTS
import Head from '../Head';
import Header from '../Header';
import Footer from '../Footer';
//MATERIAL-UI
import PetsIcon from '@material-ui/icons/Pets';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
//SWEETALERT2
import { darkAlert } from '../../alerts';
//IMAGES
import { wallpaper } from '../../images';
//CONTEXT-API
import { settingDARK } from '../../contextapi';
import { useStateValue } from '../../StateContext';
//GATSBYJS
import { navigate } from 'gatsby';

function Index() {
    const [ { dark }, dispatch ] = useStateValue();

    return (
        <>
            <Head title="Home"/>
            <Header
            />
            <div className="index">
                <div>
                    <figure className="figure">
                        <img
                            className="figure_img"
                            src={wallpaper}
                        />
                        <div>
                            <button
                                className={`btn btn-lg btn-outline-${dark ? `info` : `dark` }`}
                                onClick={() => navigate('/register')}
                                id="btn1"
                            >
                                <PetsIcon fontSize="large"/> <span style={{ marginLeft: "0.55rem", marginTop: "-0.28rem" }}> Register Now </span>
                            </button>
    
                            <button
                                className={`btn btn-${dark ? `info` : `dark` }`}
                                onClick={() => { dispatch(settingDARK()); darkAlert(dark); }}
                                id="btn2"
                            >
                                { dark ? <Brightness4Icon fontSize="small"/>: <Brightness7Icon fontSize="small"/> }
                            </button>                          
                        </div>
                    </figure>
                </div>
                <Footer
                />
            </div>
        </>
    )
}

export default Index;