import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

import { connect } from 'react-redux';

class Checkout extends Component{
    
    cancelledHandler = () => {
        this.props.history.goBack();
    }
    continuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    cancelled={this.cancelledHandler}
                    continued={this.continuedHandler}/>
                <Route
                    path={ this.props.match.url + "/contact-data" }
                    component={ContactData}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
};

export default connect(mapStateToProps)(Checkout);