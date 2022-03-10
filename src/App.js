import React, { useEffect } from 'react';  
import './App.css';
import { Route, Routes, Navigate,useNavigate,useMatch } from 'react-router-dom';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions';

//---------PAGES------------
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import HatsPage from './pages/hatspage/hatspage.component'
import JacketsPage from './pages/jacketspage/jacketspage.component'
import SneakersPage from './pages/sneakerspage/sneakerspage.component'
import WomensPage from './pages/womenspage/womenspage.component'
import MensPage from './pages/menspage/menspage.component'
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/checkout/checkout.component';


const App = ({ checkUserSession,currentUser }) => {
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession]);

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
          element={currentUser ? ( 
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
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});
const mapDisaptchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})


export default connect
  (mapStateToProps,
    mapDisaptchToProps
  )(App);
