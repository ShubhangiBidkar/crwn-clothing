import './button.styles.scss';

const BUTTON_TYPE_CLASSES = {
    google:'google-sign-in',
    inverted:'inverted',
};

const Button =({children,butttonType,...otherProps}) =>{
    console.log(BUTTON_TYPE_CLASSES[butttonType]);
    return(
        // {...otherProps is for type='submit passes to the button}
        <button className={`button-container ${BUTTON_TYPE_CLASSES[butttonType]}`}{...otherProps}>
            {/* Render the children which is the label for the button to be shown */}
            {children}
        </button>
    )

}

export default Button;