import React from 'react';
import classes from './BuildControls.module.scss';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const BuildControls = props => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <b>{props.price.toFixed(2)}</b></p>
            {controls.map(ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    added={() => props.ingredientAdded(ctrl.type) }
                    removed={() => props.ingredientRemoved(ctrl.type) }
                    disabled={props.disabled[ctrl.type]}  />
            ))}
            <p>
                <button
                    className={classes.OrderButton}
                    disabled={!props.purchasable}>ORDER NOW</button>
            </p>
        </div>
    );
}

export default BuildControls;