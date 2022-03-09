import React from 'react';
import {connect} from 'react-redux'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import { googleSignInStart } from '../../redux/user/user.actions';

import './sign-in.styles.scss';

class SignIn extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            email:'',
            password:''
        }


        this.handleSubmit = async event => {
            event.preventDefault();

            const { email, password } = this.state
            try {
                await auth.signInWithEmailAndPassword(email, password)
                this.setState({ email: '', password:''})
            } catch (error) {
                console.error(error)
            }
            

            this.setState({ email: '', password: '' })
        }

        this.handleChange = event => {
            const { value, name } = event.target
            
            this.setState({[name]:value})
        }
    }
    render() {
        const { googleSignInStart } = this.props;
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name="email"
                        type="email"
                        label="Email"
                        onChange={ this.handleChange }
                        value={ this.state.email }
                        required
                    />

                    <FormInput
                        name="password"
                        type="password"
                        label="password"
                        value={ this.state.password }
                        onChange={this.handleChange}           
                        required />
                    <div className='buttons'>
                        <Button type='submit'>Sign In</Button>
                        <Button type='button' onClick={googleSignInStart} isGoogleSignIn>SIGN IN WITH GOOGLE</Button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart:()=>dispatch(googleSignInStart())
})

export default connect(null,mapDispatchToProps)(SignIn)