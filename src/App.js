import React from 'react';  
import './App.css';
import { Route, Routes, Navigate,useNavigate,useMatch } from 'react-router-dom';
import {connect} from 'react-redux'

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import HatsPage from './pages/hatspage/hatspage.component'
import JacketsPage from './pages/jacketspage/jacketspage.component'
import SneakersPage from './pages/sneakerspage/sneakerspage.component'
import WomensPage from './pages/womenspage/womenspage.component'
import MensPage from './pages/menspage/menspage.component'
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/checkout/checkout.component'

import { auth, createUserProfileDocument,addCollectionAndDocuments } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions'; 
import { selectCollectionForPreview } from './redux/shop/shop.selector';
const match=useMatch

class App extends React.Component {
  // constructor() {
  //   super();

  //   this.state={
  //     currentUser:null
  //   }
  // }
  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props;

    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);

    //     userRef.onSnapshot(snapShot => {
    //       this.props.setCurrentUser({
    //         currentUser: {
    //           id: snapShot.id,
    //           ...snapShot.data()
    //         }
    //       });
    //     });
        
    //     setCurrentUser(userAuth);
    //     // addCollectionAndDocuments('collections', collectionsArray.map(({ title, items }) => ({ title, items })));
    //   };
   
    // })
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render(){
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path='/*' element={<HomePage />} />
        <Route path='/shop' element={ <ShopPage /> } />
        <Route path='/checkout' element={ <CheckoutPage /> } />
        <Route path='/shop/hats' element={ <HatsPage /> } />
        <Route path='/shop/Jackets' element={ <JacketsPage /> } />
        <Route path='/shop/sneakers' element={ <SneakersPage /> } />
        <Route path='/shop/womens' element={ <WomensPage /> } />
        <Route  path='/shop/womens' element={<MensPage />} />
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
  setCurrentUser: user.currentUser,
  collectionsArray:selectCollectionForPreview
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser:user=>dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
