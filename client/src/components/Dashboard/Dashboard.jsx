import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';



import './Dashboard.scss' 

const Dashboard = ({location: { location }}) => {

    const [menu, setMenu] = useState();

    useEffect(() => {
        async function fetchData() {
        const res = await axios.get('/api/menu');

        setMenu(res.data);
        }
        fetchData()
    }, [])


    const { option, addressType, streetAddress, suiteApt, zipCode } = location
    
    

    return <div className='dashboard-container'>
        <div className='order-option-address-container'>
            <div className='inner'>
                <h2>{option === "Delivery" ? "Food Delivery" : "Carry Out"}</h2>
                <h3>{option === "Delivery" ? `${streetAddress} ${suiteApt}, ${zipCode}` : "Carry Out"}</h3>
                
            </div>
        </div>
    </div>
}

Dashboard.propTypes = {
    location: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    location: state.location
  });

export default connect(mapStateToProps, null)(Dashboard)