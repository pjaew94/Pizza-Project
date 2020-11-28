import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import pizzaGuy from '../../media/delivery.svg';

import './Alert.scss'

const Alert = ({alert}) => {

    return <div className={`alert-container ${alert.show && "display-alert"}`}>
    <div className='inner'>
        <img src={pizzaGuy} alt='pizza guy'/>
        <h3>{alert.msg}</h3>
        </div>
    </div>
}

Alert.propTypes = {
    alert: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    alert: state.alert
})

export default connect(mapStateToProps, null)(Alert)