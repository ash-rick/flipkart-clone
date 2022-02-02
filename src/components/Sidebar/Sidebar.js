import React, {useState} from 'react'
import 'components/Sidebar/Sidebar.scss'
import Slider from '@material-ui/core/Slider';
import {  TextField, InputAdornment, Button } from '@material-ui/core';
import { NavigateBefore, HelpOutline, ExpandMore, ExpandLess, SearchOutlined, StarRate, Clear} from '@material-ui/icons';
function Sidebar() {

    const [filter, setFilter] = useState([]);
    const [showBrand, setShowBrand] = useState(false);
    const [showCustomerRating, setShowCustomerRating] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    let brands_name = ['VPrime', 'clasikcart', 'BiZBEETeach', 'BeeVaulte', 'CHVAT', 'EZGER'];
    let ratings = ['4', '3', '2', '1']
    let price = ['100', '200', '300', '400', '500', '750', '900', '1000']



    const addFilter = (e) => {
        let name = e.target.name;
     
        if(name === 'min-val' || name === 'max-val') {
            setFilter([...filter, '₹' + e.target.value]);
        }
        else if(e.target.checked) 
            setFilter([...filter, e.target.name]);
        else {
            e.target.checked = false;
            setFilter(filter.filter(f => f !== name));
        }
    }
    const clearFilter = (name) => {
        setFilter(filter.filter(f => f !== name));
    }
    return (
        <div className='sidebar'>
            <div className='filter'>
                <div className='filter-header'>
                    <span className='filter-text'>Filters</span>
                    <Button className={(filter.length ? 'clear-filter' : 'hide')} onClick={() => setFilter([])} >CLEAR ALL</Button>
                </div>
                
                <div className='added-filters'>
                    {
                        filter.map((f, i) =>
                            <Button key={i} className='filter-button' onClick={(e) => clearFilter(f)}><Clear className='clear-icon'/>{f}</Button> 
                        )
                    }
                </div>
            </div>
            <div className='categories'>
                <p className='category-lable'>Categories</p>
                <div className='category-link'><span ><NavigateBefore className='navigate-before-icon'/></span><p className='category-link-text'>Mobile & Accessories</p></div>
                <div className='category-link'><span ><NavigateBefore className='navigate-before-icon'/></span><p className='category-link-text'>Mobile Accessories</p></div>
                <p className='category-bottom-text'>Mobile Camera Lens Protectors</p>
            </div>
            <div className='price'>
                <p className='price-text'>Price</p>
                <span className='slider'>  
                    <Slider
                        value={[0, 100]}
                        id='slider-bar'
                        // onChange={handleChange}
                        valueLabelDisplay="auto"
                        // getAriaValueText={valuetext}
                   />
                </span>
                <div className='range-selectors'>
                    <select className='range-selector-1' name='min-val' onChange={(e) => addFilter(e)} >
                        <option value='min'>Min</option>
                        {price.map((p, i) => 
                            <option key={i} value={p}>{p}</option>
                        )}
                    </select>
                    <p className='range-to'>to</p>
                    <select className='range-selector-2' name='max-val' onChange={(e) => addFilter(e)}>
                        <option value='1000'>₹1000+</option>
                        {price.map((p, i) => 
                            <option key={i} value={p}>{p}</option>
                        )}
                    </select>
                </div>
            </div>
            <div className='assured-check'>
                <input type='checkbox' name='Flipcart Assured'  onChange={(e) => addFilter(e)}/>
                <img className='assured-img' src='https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png' alt='flipcart-assured' />
                <span><HelpOutline className='help-icon'/></span>
            </div>
            <div className='brand'>
                <div onClick={() => { setShowBrand(showBrand ? false : true)}} className='brand-selector'>
                    <p className='Brand-text'>BRAND</p>
                    <span>{showBrand ? <ExpandLess className='brand-expand-icon'/> : <ExpandMore className='brand-expand-icon'/>}</span>
                </div>
                <div className={(showBrand ? 'brand-details' : ' hide')}> 
                    
                    <TextField
                        id="input-with-icon-textfield"
                        label=""
                        placeholder='Search Bar'
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchOutlined className='search-icon' />
                            </InputAdornment>
                        ),
                        }}
                        variant="standard"
                    />
                    <div className='brands-checkbox'>
                            {brands_name.map((brand, i) => (
                                
                                <div key={i} className='brands'>
                                    <input type='checkbox' name={brand} onChange={(e) => addFilter(e)}/>
                                    <p className='brand-name'>{brand}</p>
                                </div>
                            )) 
                            }
                        
                    </div>
                </div>
               
            </div>
            <div className='customer-rating'>
                <div onClick={() => { setShowCustomerRating(showCustomerRating ? false : true)}}className='rating-selector'>
                    <p className='customer-rating-text'>CUSTOMER RATINGS</p>
                    <span>{showCustomerRating ? <ExpandLess className='brand-expand-icon'/> : <ExpandMore className='brand-expand-icon'/>}</span>
                </div>
                <div className={(showCustomerRating ? 'ratings-details' : 'hide')}>
                    {ratings.map((rate, i) => 
                        <div key={i} className='ratings'>
                            <input className='checkbox' type='checkbox' name={rate + 'star & above'} onChange={(e) => addFilter(e)}/>
                            <p className='rating-text'>{rate}<span><StarRate className='star-icon'/></span> & above</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
