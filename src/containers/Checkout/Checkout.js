import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        totalPrice: 0
    }
    
    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {...this.state.ingredients};
        let price = 0;
        for (const param of query.entries() ) {
            // param = ["bacon", "1"]
            if(param[0] === 'price')
                price = param[1];
            else
                ingredients[param[0]] = +param[1];
        }
        this.setState( {ingredients: ingredients, totalPrice: price} );
    }

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
                    ingredients={this.state.ingredients}
                    cancelled={this.cancelledHandler}
                    continued={this.continuedHandler}/>
                <Route
                    path={ this.props.match.url + "/contact-data" }
                    render={props => <ContactData {...props} ingredients={ this.state.ingredients } price={this.state.totalPrice}/> }/>
            </div>
        );
    }
}

export default Checkout;