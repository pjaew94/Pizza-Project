import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { hideNav } from '../../actions/nav';

import './NavigatorM.scss'

const NavigatorM = ({ hideNav, displayNav }) => {

    useEffect(() => {

    }, [displayNav])

    return (<div data-testid='navigator' className={`navigator-container ${displayNav === true ? 'show-navigator' : null}`}>
        <div className='inner'>

        </div>
        <div className='backdrop' onClick={() => hideNav()} />
    </div>)
}
 
NavigatorM.propTypes = {
    displayNav: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    displayNav: state.nav.displayNav
});


export default connect(mapStateToProps, { hideNav })(NavigatorM)