import {BaseButton,InvertedButton,GoogleSignInButton} from './button.styles'

export const  BUTTON_TYPE_CLASSES = {
    base:'base',
    google:'google-sign-in',
    inverted:'inverted',
};

const getButton = (butttonType = BUTTON_TYPE_CLASSES.base)=>({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]:GoogleSignInButton ,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton

}[butttonType])

const Button =({children,butttonType,...otherProps}) =>{
    const CustomButtom =getButton(butttonType);
    // console.log(CustomButtom);
    return(
       
        <CustomButtom{...otherProps}>
            {/* Render the children which is the label for the button to be shown */}
            {children}
        </CustomButtom>
    )

}

// const Button =({children,butttonType,...otherProps}) =>{
//     // console.log(BUTTON_TYPE_CLASSES[butttonType]);
//     return(
//         // {...otherProps is for type='submit passes to the button}
//         <button className={`button-container ${BUTTON_TYPE_CLASSES[butttonType]}`}{...otherProps}>
//             {/* Render the children which is the label for the button to be shown */}
//             {children}
//         </button>
//     )

// }

export default Button;