import React, {useEffect, useState} from 'react'
import {  TextField, IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {useSelector, useDispatch} from 'react-redux';
import { SearchOutlined, Close, ArrowLeft} from '@material-ui/icons';
import {ExpandMore, ShoppingCart, Visibility, VisibilityOff} from '@material-ui/icons';
import {useNavigate} from 'react-router-dom';
import Modal from 'react-modal';
import {nowUser} from 'redux/actions/dataAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'components/Header/Header.scss'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from 'firebase-config'
 
function Header(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart_data = useSelector(state => state.Data.cart_data);
    const [modalIsOpen, setIsOpen] = useState(false);

    // const [registerEmail, setRegisterEmail] = useState("");
    // const [registerPassword, setRegisterPassword] = useState("");
    // const [loginEmail, setLoginEmail] = useState("");
    // const [loginPassword, setLoginPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [isLoginModal, setIsLoginModal] = useState(true);
  
    const [user, setUser] = useState({});
    // console.log(auth);
    const openModal = () => {
      setIsLoginModal(true)
      setIsOpen(true);
    }
  
    const closeModal = () => {
      setIsOpen(false);
    }

    useEffect(() => {
      dispatch(nowUser(user));
    }, [user])

    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const register = async () => {
      
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          Email,
          Password
        );
        toast.success(`welcom to flipkart-clone`, {
          theme: 'dark'
        });
        setIsOpen(false);
      } catch (error) {
        let index = error.message.indexOf('/');
        toast.error(error.message.slice(index+1,-2), {
          theme: 'dark'
        });
      }
      toast.success(`welcom ${user.email} in success`, {
          theme: 'dark'
        });
    };

    const login = async () => {
    
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          Email,
          Password
        );
        toast.success(`loggedin success`, {
          theme: 'dark'
        });
        setIsOpen(false);
      } catch (error) {
        let index = error.message.indexOf('/');
        toast.error(error.message.slice(index+1,-2), {
          theme: 'dark',
          position: 'top-center'
        });
      }
    };

    const logout = async () => {
      await signOut(auth);
      toast.warn('you logged out to flipkart-clone', {
        theme: 'dark',
        position: 'bottom-center'
      });
    };
    
    Modal.setAppElement('#root');
    

    return (
      <>
      <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => closeModal()}
            className='modal'
            overlayClassName="Overlay"
            contentLabel="Example Modal"
          >
            
            <div className='login-modal'>
              <div className='modal-left'>
                <p className='login-text'>{isLoginModal ? 'Login' : 'Looks like you\'re new here!'}</p>
                <p className='some-text'>{isLoginModal ? 'Get access to your Orders, Wishlist and Recommendations' : 'Sign up with your mobile number to get started'}</p>
                <img className='login-img' src='https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png' alt='login-img'/>
              </div>
              <div className='modal-right'>
                <form autoComplete='on'>
                  <TextField
                    className="email-field"
                    label="Enter Email/Mobile number"
                    type="email"
                    onChange={(e) => {
                      setEmail(e.target.value)
                      // isLoginModal ? setLoginEmail(e.target.value) : setRegisterEmail(e.target.value);
                    }}
                    variant="standard"
                  />
                  <TextField
                    className="email-field"
                    label="Enter Password"
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value)
                      // isLoginModal ? setLoginPassword(e.target.value): setRegisterPassword(e.target.value);
                    }}
                    variant="standard"
                    InputProps={{
                      endAdornment: (
                          <Visibility className='visibility-icon'/>
                      ),
                    }}
                  />
                  <p className='login-terms'>By continuing, you agree to Flipkart's <span className='blue-link'>Terms of Use</span> and <span className='blue-link'>Privacy Policy</span>.</p>
                  <Button className='btn-login' onClick={() => {isLoginModal ? login() : register()}} >{isLoginModal ? 'login' : 'sign up'}</Button>
                  {isLoginModal && <div className='another-method'> 
                    <p className='or'>OR</p>
                    <Button variant='text'className='btn-otp' >Request OTP</Button>
                  </div>}
                  <p className='create-acc' onClick={() => {isLoginModal ? setIsLoginModal(false): setIsLoginModal(true)}}>{!isLoginModal ? 'Existing User? Log in' : 'New to Flipkart? Create an account'}</p>
                </form>
                
              </div>
            </div>
            <Close onClick={() => closeModal()} className='close-modal'></Close>
          </Modal>
          <div className='header'>
            
            <div className='header-logo'>
              <img className='logo-img' src='https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png' alt='flipcart-logo' onClick={() => navigate('/')}/>
              <div className='logo-subtitle'>
                <p className='subtitle-explore'>Explore</p>
                <p className='subtitle-plus'>Plus</p>
                <span><img className='explore-plus-img' src='https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png' alt='+' /></span>
              </div>
            </div>
            <div className='header-search-bar'>
              <TextField
                  fullWidth
                  className='search-input'
                  placeholder='Search for products, brand and more'
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                        <SearchOutlined className='search-icon'/>
                    ),
                  }}
                />
            </div>
            <div className='header-login'>
                <Button className='login-button'onClick={() => {user ? logout() : openModal()}} >{user ?'Logout':'Login'}</Button>
            </div>
            
            {!props.cart && <div className='header-more'>
                <p className='nav-more'>More</p>
                <span><ExpandMore className='expandmore-icon'/></span>
              </div>
            }
            {props.cart && props.cartData && <div className='header-more' onClick={() =>  navigate('/product',{state:{product: props.cartData.product}})}>
                <span><ArrowLeft className='expandmore-icon'/></span>    
                <p className='nav-more'>back</p>         
              </div>
            }
            {!props.cart && 
              <div className='header-cart' onClick={() => navigate('/cart')}>
                <span><ShoppingCart className='shoppingcart-icon'/></span>
              {cart_data.length !== 0 && <div className='cart-count'>{cart_data.length}</div>}
                <p className='nav-cart'>Cart</p>
              </div>
            }
        
          </div>
      </>
       
    )
}

export default Header
