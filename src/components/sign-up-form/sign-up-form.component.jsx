import { useState,useContext } from "react";
import { createAuthUserWithEmailAndPassword ,createDocumentFromUserAuth} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";


const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  
//    console.log(formFields);

// we create a generic handleChange function that looks at the name attribute (name=) on each input type and dynamically sets the component’s state based on the input field’s name attribute (name=) and the value associated with it.
   const handleChange = (event) => {
    const { name, value } = event.target;
    // In Javascript, when you create an object literal {} and you wrap the object’s key in array brackets [key] you can dynamically set that key.
    setFormFields({ ...formFields, [name]: value });
  };
// Reset the form fields
const resetFormFields =()=>{
    setFormFields(defaultFormFields);
}
//   Handle the submit event
  const handleSubmit = async(event) =>{
    
    event.preventDefault();
    

    if(password !== confirmPassword){
        alert('Passwords do not match');
        return;
    }

    try{
        const {user} = await createAuthUserWithEmailAndPassword(email,password)
       
        await createDocumentFromUserAuth(user,{displayName})
        resetFormFields();
   
    }catch(error){
        if(error.code === 'auth/email-already-in-use'){
            alert('Cannot create user,email already in use')
        }
        else{
            console.log('user created encountered an error' ,error.message);
        }
        
    }
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span>Sign up with your Email and password</span>
      <form onSubmit={handleSubmit}>
        
        <FormInput
          label='Display Name'
          type="text"
          required
          name="displayName"
          value={displayName}
          onChange={handleChange}
        />

        
        <FormInput
          label='Email'
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />

        
        <FormInput
          label='Password'
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
        />

        
        <FormInput
          label='Confirm Password'
          type="password"
          required
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />

        <Button  type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
