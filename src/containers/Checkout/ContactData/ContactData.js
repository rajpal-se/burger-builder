import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.scss';
import axios from './../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        
        this.setState({loading: true});
        
        let order = {
            price: this.props.price,
            customer: {
                name: "Test",
                email: 'test@gmail.com',
                address: {
                    street: "test street",
                    zipCode: "655678",
                    country: "UK"
                }
            }
        }
        axios.post('orders.json', order)
        .then( response => {
                // console.log(response);
                this.setState({loading: false});
                this.props.history.push('/'); 
            } )
            .catch( error => {
                // console.log(error);
                this.setState({loading: false});
            } );
    }

    render(){
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
                <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;