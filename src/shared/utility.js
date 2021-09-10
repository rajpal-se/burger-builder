export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}
export const checkValidity = ( value, rules ) => {
    let isValid = true;
    if ( !rules ) return true;

    if ( isValid && rules.required ) isValid = value.trim() !== '';
    if ( isValid && rules.minLength ) isValid = value.length >= rules.minLength;
    if ( isValid && rules.maxLength ) isValid = value.length <= rules.maxLength;
    if ( isValid && rules.isEmail ) isValid = /\S+@\S+\.\S+/.test( value );
    if ( isValid && rules.isNumeric ) isValid = /^\d+$/.test( value );

    return isValid;
}