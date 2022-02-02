import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {addRecentlyView} from 'redux/actions/dataAction';
import {StarRate} from '@material-ui/icons';
import 'components/productCard/ProductCard.scss'


function ProductCard(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const recentlyViewData = useSelector(state => state.Data.recently_view_data);
    // console.log(recentlyViewData )
    const p = props.product;

    const handleCardClick = (p) => {
        navigate('/product',{state:{product: p}});
        dispatch(addRecentlyView(recentlyViewData, p));
        
    }
    
   
  return (
    <>
        <div className='card' style={ props.justwidth ? { width:'100%'} : {}} onClick={() => handleCardClick(p)}>
            <div className='product-img-block' style={ props.justwidth ? { width:'170px', height: '170px'} : {}}>
                <img className='product-img' src={p.images[0]} alt='img' />
            </div>
            <p className='product-desc'>{p.name}</p>
            <div className='product-rate-rev'>
                <div className='product-rating'>
                    <p className='rating'>{p.ratingReviews.avg_rating}</p>
                    <StarRate className='star-icon'/>
                </div>
                <span className='review'>({p.ratingReviews.reviews})</span>
                <img className='assured-img' src='https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png' alt='assured' />

            </div>
            <div className='product-value'>
                <p className='price'>₹{Math.round(p.price - p.price*(p.discount/100))}</p>
                <p className='before-price'>₹{p.price}</p>
                <span className='price-off'>{p.discount}% off</span>
            </div>
            {!props.justwidth && <div className='offer'>Bank offer</div>}
        </div>
    </>
  );
}

export default ProductCard;
