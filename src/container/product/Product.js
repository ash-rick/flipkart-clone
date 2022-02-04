import React, { useState, useEffect } from 'react'
import Header from 'components/Header/Header';
import Slider from "react-slick";
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { Breadcrumbs, Button } from '@material-ui/core';
import {FlashOn, ShoppingCart, StarRate, Info, LocalOffer, ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import ProductCard from 'components/productCard/ProductCard';
import {getData, addCartData} from 'redux/actions/dataAction';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'container/product/product.scss';


function Product(props) {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getData());
    }, [dispatch])
 
    const recentlyViewData = useSelector(state => state.Data.recently_view_data);
    const data = useSelector(state => state.Data.data);
    const cart_data = useSelector(state => state.Data.cart_data);
   
    const navigate = useNavigate();
    const {state} = useLocation();
    const pro = state.product;
    let first_img = pro.images[0];
    const [mainImage, setMainImage] = useState('');

    let breadcrumbs_list = ['home', 'mobile & accessories', 'mobile glass'];

    const cartAdded = (pro) => {
        
        dispatch(addCartData(cart_data ,pro));
        navigate('/cart');
    }

    const PreviousBtn = (props) => {
        const { className, onClick } = props;
        return (
          <div className={className} onClick={onClick}>
            <ArrowBackIos  className='arrow-left' />
          </div>
        );
      };
      const NextBtn = (props) => {
        const { className, onClick } = props;
        return (
          <div className={`${className} btn-nxt`} onClick={onClick}>
            <ArrowForwardIos className='arrow-right'  />
          </div>
        );
      };

    const carouselProperties = {
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
        slidesToShow: 6,
        slidesToScroll:6,
        infinite:true,
        centerPadding: "220px",
      };

    return (
        <>
            <Header />
            <div className='product'>
                <div className='products-left-page'>
                    <div className='product-images'>
                        <div className='product-all-img'>
                            { pro.images && pro.images.map((p, i) => 
                                <div key={i} className='pro-img-div' onMouseOver={() => setMainImage(p)}>               
                                    <img className='pro-img' src={p} alt='' />
                                </div>
                            )}   
                        </div>
                        <div className='show-img'>
                            <img className='show-pro-img' src={mainImage ? mainImage : first_img} alt='' />
                        </div>
                    </div>
                    <div className='product-buttons'>
                        <Button className='btn-add-to-cart' onClick={() => cartAdded(pro)}><ShoppingCart />add to cart</Button>
                        <Button className='btn-by-now'><FlashOn />buy now</Button>
                    </div>
                </div>
                <div className='product-right-page'>
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        {breadcrumbs_list.map((bl, i) => 
                            <Link key={i} className='breadcrumb-link' to='' >{bl}</Link>
                        )}
                    </Breadcrumbs>
                    <p className='product-name'>{pro.name}</p>
                    <div className='product-rate-review'>
                        <div className='product-rating'>
                            <p className='rating'>{pro.ratingReviews.avg_rating}</p>
                            <StarRate className='star-icon'/>
                        </div>
                        <p className='rate-review'>{pro.ratingReviews.rating} Rating & {pro.ratingReviews.reviews} Reviews</p>
                        {pro.assured && <img className='assured-img' src='https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png' alt='' />}
                    </div>
                    {pro.specialPrice && <div className='spacial-price'>Spacial Price</div>}
                    <div className='product-price'>
                        <p className='price'>₹{Math.round(pro.price - pro.price*(pro.discount/100))}</p>
                        <p className='before-price'>₹{pro.price}</p>
                        <p className='price-off'>{pro.discount}% off</p>
                        <Info className='price-info'/>
                    </div>
                   

                    <div className='available-offer'>
                        <p className='available-offer-text'>Available offers</p>
                    {pro.offers.length && pro.offers.map((o, i) => 
                        <div key={i} className='offer'>
                            <LocalOffer className='offer-tag'/>
                            <p className='offer-type'>{o.offerType}</p>
                            <p className='offer-desc'>{o.description}</p>
                            <p className='offer-tc'>T&C</p>
                        </div>
                    )}
                    </div>
                   
                    <div className='product-warranty'>
                        <p className='warranty'>Warranty</p>
                        <p className='warranty-desc'>{pro.services.warranty}</p>
                    </div>
                    <div className='product-delivery'>

                    </div>
                    <div className='product-services'>
                        <p className='services'>Services</p>
                        <div className='available-services'>
                            <p className='service-desc'><img className='service-img' src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcgLjc1bC02Ljc1IDN2NC41YzAgNC4xNjIgMi44OCA4LjA1NSA2Ljc1IDkgMy44Ny0uOTQ1IDYuNzUtNC44MzggNi43NS05di00LjVMNyAuNzV6bS0xLjUgMTJsLTMtMyAxLjA1OC0xLjA1N0w1LjUgMTAuNjI3bDQuOTQzLTQuOTQyTDExLjUgNi43NWwtNiA2eiIgZmlsbD0iIzIxNzVGRiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+' alt='service'/>             {pro.services.warranty}
                            </p>
                            <p className='service-desc'><img className='service-img' src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGQ9Ik0wIDEwYzAgNS41MjIgNC40NzggMTAgMTAgMTBzMTAtNC40NzggMTAtMTBTMTUuNTIyIDAgMTAgMCAwIDQuNDc4IDAgMTB6IiBpZD0iYSIvPjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIgMikiPjxtYXNrIGlkPSJiIiBmaWxsPSIjZmZmIj48dXNlIHhsaW5rOmhyZWY9IiNhIi8+PC9tYXNrPjxwYXRoIGZpbGw9IiMyODc0RjAiIG1hc2s9InVybCgjYikiIGQ9Ik0tNS41NTYgMjUuNTU2aDMxLjExMlYtNS41NTZILTUuNTU2eiIvPjwvZz48cGF0aCBkPSJNMTEuMDIgNy41MnMyLjI1Ni4xIDIuMjU2IDIuNjFjMCAyLjQ1LTMuMDggMi43MjQtNC4wNyAyLjc1NGEuMTIuMTIgMCAwMC0uMDg3LjJsNC4wOCA0Ljg0NU04LjY1NyA3LjUyaDYuODQ1bS02Ljg0NSAyLjYzNWg2Ljg0NSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuMzIiIHN0cm9rZT0iI0ZGRiIvPjwvZz48L3N2Zz4=' alt='service' />
                                {pro.services.paymentType} available
                                <Info className='price-info'/>
                            </p>
                        </div>

                    </div>
                    <div className='product-seller'>
                        <p className='seller'>Seller</p>
                        {pro.seller && pro.seller.map((sell, i) => 
                        <div key={i} className='seller-desc'>
                            <div className='seller-name-rate'>
                                <p className='seller-name'>{sell.name}</p>
                                <div className='seller-rate'>{sell.rating} <StarRate className='star-icon'/></div>
                            </div>
                            <div className='seller-return'>
                                <p className='point'></p>
                                <p className='return'>{sell.returns ?'' : 'No'} Return Applicable</p>
                            </div>
                        </div>
                        )}
                        
                    </div>
                    <div className='product-desc'>
                        <p className='description'>Description</p>
                        <p className='desc'>{pro.description}</p>
                    </div>
                      
                </div>
            </div>
            <div className='similar-products'>
                <p className='similar-text'>Similar products</p>
                <Slider {...carouselProperties}>
                    {data && data.map((d, i) => 
                        <ProductCard key={i} product={d} justwidth={true}/>
                    )}
                </Slider>
            </div>
            {/* <div className='recent-products'>
                <p className='recent-text'>Recently View products</p>
                <Slider {...carouselProperties}>
                    {recentlyViewData && recentlyViewData.map((rv, i) => 
                        <ProductCard key={i} product={rv} justwidth={true}/>
                    )}
                </Slider>
            </div> */}
        </>
    )
}

export default Product
