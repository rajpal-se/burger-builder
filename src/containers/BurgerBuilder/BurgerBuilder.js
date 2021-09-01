import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from './../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component{

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        axios.get('ingredients.json')
        .then(response => {
            // console.log(response);
            const price = Object.keys(response.data)
                .map(igKey => response.data[igKey] * INGREDIENT_PRICES[igKey] )
                .reduce( (prev, newValue) => prev + newValue, this.state.totalPrice);
            
            const sum = Object.keys(response.data)
                .map(igKey => response.data[igKey] )
                .reduce( (sum, el) => {
                    return sum + el;
                }, 0);
                
            this.setState({
                ingredients: response.data,
                totalPrice: price,
                purchasable: sum > 0
            });
            this.updatePurchaseState(response.data);
        })
        .catch(error => {
            this.setState({error: true});
        });
    }

    updatePurchaseState (ingredients) {
        // const ingredients = { ...this.state.ingredients }
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce( (sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = type => {
        let ingredients = {...this.state.ingredients};
        let totalPrice = this.state.totalPrice;

        ingredients[type]++;
        totalPrice += INGREDIENT_PRICES[type];

        this.setState({
            ingredients: ingredients,
            totalPrice: totalPrice
        });
        this.updatePurchaseState(ingredients);
    }
    removeIngredientHandler = type => {
        let ingredients = {...this.state.ingredients};
        let totalPrice = this.state.totalPrice;

        if(ingredients[type] <= 0) return;

        ingredients[type]--;
        totalPrice -= INGREDIENT_PRICES[type];

        this.setState({
            ingredients: ingredients,
            totalPrice: totalPrice
        });
        this.updatePurchaseState(ingredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () => {
        // alert('You Continue!');
        this.setState({loading: true});
        
        let order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            email: 'test@gmail.com'
        }
        axios.post('orders.json', order)
        .then( response => {
                // console.log(response);
                this.setState({loading: false, purchasing: false});
            } )
            .catch( error => {
                // console.log(error);
                this.setState({loading: false, purchasing: false});
            } );
    }

    render(){
        const disabledInfo = {...this.state.ingredients}

        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        
        let burger = this.state.error ? <h2 style={{textAlign: 'center'}}>Ingredients can't be loaded.</h2> : <Spinner/>;
        
        if(this.state.ingredients){
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}/>
                </>
            );

            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.state.totalPrice}/>
            );
        }
        
        if(this.state.loading) orderSummary = <Spinner/>;
        
        return (
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);