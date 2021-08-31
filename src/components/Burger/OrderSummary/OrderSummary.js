import React from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {
    let ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return <li key={igKey}><span style={{textTransform: 'caplitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>;
    });
    
    // console.log("[OrderSummary.js] Order Summary is Rendered.");

    return (
        <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><b>Total Price: {props.price.toFixed(2)}</b></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </>
    );
}

export default OrderSummary;
