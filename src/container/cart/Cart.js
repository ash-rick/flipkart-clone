import React, { useEffect} from 'react';
import Header from 'components/Header/Header';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Info} from '@material-ui/icons';
import 'container/cart/Cart.scss';
import { Button } from '@material-ui/core';
import {removeProduct, updateProductFrequency, placedItem, addWholeCart} from 'redux/actions/dataAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Cart() { 

	const cart_data = useSelector(state => state.Data.cart_data);
	const user = useSelector(state => state.Data.user);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(addWholeCart(JSON.parse(localStorage.getItem("cart") || '[]')));
	}, [])

	let price_sum = 0;
	let discount_sum = 0;
	

	cart_data.map((c, i) => {
		price_sum += c.product.price * c.freq;
		discount_sum += c.freq * Math.round(c.product.price * c.product.discount/100);
	});
	let dilevry_charge = 40 * cart_data.length;
 
	
    
	if(price_sum - discount_sum > 499) dilevry_charge = 0;

	const removeFromCart = (pro) => {
		dispatch(removeProduct(cart_data, pro));
	}
	const addFreq = (id, cart, select) => {
		dispatch(updateProductFrequency(cart_data, id, cart, select));
	}
	const orderPlaced = () => {
		if(user) {
			dispatch(placedItem());
			toast.success('Oredr placed successfully',
				{theme: 'dark',
				position: 'bottom-center' 
			})
		}
		else {
			toast.info('Login first to place order',
				{theme: 'dark',
				position: 'bottom-center' 
			})
		}
	}
    return( 
    <>  
      <Header cart={true} cartData={cart_data[cart_data.length-1]}/>
	    {cart_data.length === 0 ? 
			<div className='cart-empty-page'>
				<div className='cart-empty'>My Cart Empty</div>
				<div className='empty-cart-mid'>
					<img className='empty-cart-img' src='https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90' alt='no item'/>
					<p className='cart-missing'>Your cart is empty!</p>
					<p className='add-item'>add item to your cart</p>
					<Button className='shop-now' onClick={() => navigate('/')}>Shop Now</Button>
				</div>

			</div>
			:
			<div className='cart-page'>
				<div className='cart-left-part'>
					<div className='cart-header'>
						<p className='my-cart-text'>MY Cart({cart_data.length})</p>
						<div className='cart-location'>
							<img className='img-location-on' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZWxsaXBzZSBjeD0iOSIgY3k9IjE0LjQ3OCIgZmlsbD0iI0ZGRTExQiIgcng9IjkiIHJ5PSIzLjUyMiIvPjxwYXRoIGZpbGw9IiMyODc0RjAiIGQ9Ik04LjYwOSA3LjAxYy0xLjA4IDAtMS45NTctLjgyNi0xLjk1Ny0xLjg0NSAwLS40ODkuMjA2LS45NTguNTczLTEuMzA0YTIuMDIgMi4wMiAwIDAgMSAxLjM4NC0uNTRjMS4wOCAwIDEuOTU2LjgyNSAxLjk1NiAxLjg0NCAwIC40OS0uMjA2Ljk1OS0uNTczIDEuMzA1cy0uODY0LjU0LTEuMzgzLjU0ek0zLjEzIDUuMTY1YzAgMy44NzQgNS40NzkgOC45MjIgNS40NzkgOC45MjJzNS40NzgtNS4wNDggNS40NzgtOC45MjJDMTQuMDg3IDIuMzEzIDExLjYzNCAwIDguNjA5IDAgNS41ODMgMCAzLjEzIDIuMzEzIDMuMTMgNS4xNjV6Ii8+PC9nPjwvc3ZnPg==' alt='location on' />
							<p className='deliver'>Deliver to</p>
							<input className='input-pincode' placeholder="Enter delivery pincode   Check" />
						</div>
					</div>
				{cart_data && cart_data.map((cart, id) => 

					<div key={id} className='cart-content'>
						<div className='cart-content-upper'>
							<div className='cart-img-div' >
								<img className='cart-img' src={cart.product.images[0]} alt='cart-img' />
							</div>
							<div className='cart-product-detail'>
								<p className='cart-pro-name'>{cart.product.name}</p>
								<p className='cart-pack'>Pack of: 1</p>
								<div className='cart-seller'>
									<p className='cart-pro-seller'>{cart.product.seller[0].name}</p>
									<img className='assured' src='https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png' alt='' />
								</div> 
								<div className='cart-prices'>
									<p className='actual-price'>₹{cart.freq * Math.round(cart.product.price - cart.product.price*(cart.product.discount/100))}</p>
									<p className='before-price'>{cart.product.price * cart.freq }</p>
									<p className='price-off'>{cart.product.discount}% off</p>
									<p className='price-offer'>1 offer applied <Info className='price-info'/></p>
								</div>
							</div>
							<div className='deliver-by'>
								Delivery by Thu Jan 27 | ₹40
							</div>
						</div>
						<div className='cart-content-bottom'>
							<p className={(cart.freq === 1 ? 'btn- blur': 'btn-')} onClick={() => addFreq(id, cart, -1)}>-</p>
							<p className='pro-count'>{cart.freq}</p>
							<p className='btn-' onClick={() => addFreq(id, cart, 1)}>+</p>
							<div className='save-remove'>
								<Button className='save-for-later-n-remove'>SAVE FOR LATER</Button>
								<Button className='save-for-later-n-remove'onClick={() => removeFromCart(cart)}>REMOVE</Button>
							</div>
						</div>
					</div>
					)}
					<div className='cart-footer'>
						<Button className='place-order'onClick={() => orderPlaced()}>PLACE ORDER</Button>
					</div>
				</div>
			
			
			
				<div className='cart-right-part'>
					<div className='price-detail-text'>PRICE DETAIL</div>
					<div className='price-content'>
						<div className='price-detail'>
							<p className='left-item'>Price ({cart_data.length} item)</p>
							<p className='price-val'>₹{price_sum}</p>
						</div>
						<div className='price-detail'>
							<p className='left-item'>Discount</p>
							<p className='discount-val'>-₹{discount_sum}</p>
						</div>
						<div className='price-detail'>
							<p className='left-item'>Delivery Charges</p>
							<p className={!dilevry_charge ? 'delivery-free' : ''}>{dilevry_charge ? `₹${dilevry_charge}` : 'FREE'}</p>
						</div>
						<div className='total-amount'>
							<p className='total-amount-text'>Total Amount</p>
							<p className='total-amount-val'>₹{price_sum - discount_sum + dilevry_charge}</p>
						</div>
						<div className='total-amount'>
							<p className='save-amount'>You will save ₹{discount_sum - dilevry_charge} on this order</p>
						</div>
					</div>
				</div>
			</div>
		}
	</>
)
}

export default Cart;
