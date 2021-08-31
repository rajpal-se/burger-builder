import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component{

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
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
        alert('You Continue!');
    }

    render(){
        const disabledInfo = {...this.state.ingredients}

        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}/>
            </>
        )
    }
}

export default BurgerBuilder;