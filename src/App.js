import React from 'react';  
import './App.css';
import { Route, Routes, Navigate,useNavigate } from 'react-router-dom';
import {connect} from 'react-redux'

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/checkout/checkout.component'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions'; 

class App extends React.Component {
  // constructor() {
  //   super();

  //   this.state={
  //     currentUser:null
  //   }
  // }
  unsubscribeFromAuth=null

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.props.setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
        
        
      } else {
        setCurrentUser(userAuth)
      }
   
    })
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render(){
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/shop' element={ <ShopPage /> } />
        <Route  path='/checkout' element={<CheckoutPage />} />
        {/* <Route exact path='/signin' element={ <SignInAndSignUpPage /> } */ }
        <Route path='/signin'
          element={
            this.props.currentUser ? ( 
              <Navigate to="/" />
            ) : (
            <SignInAndSignUpPage />
          )
        }
          />
        
      </Routes>
       
    </div>
  )
  }
}
const mapStateToProps = ({ user }) => ({
  setCurrentUser:user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser:user=>dispatch(setCurrentUser(user))
})

export default connect(null,mapDispatchToProps)(App);
