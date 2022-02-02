import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Breadcrumbs } from '@material-ui/core';
import 'components/Midbar/Midbar.scss'
import {useSelector, useDispatch} from 'react-redux';
import {getData} from 'redux/actions/dataAction';
import ProductCard from 'components/productCard/ProductCard';


function Midbar() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getData());
    }, [dispatch])

    const data = useSelector(state => state.Data.data);

    let breadcrumbs_list = ['home', 'mobile & accessories', 'mobile glass'];
    
    return (
        
        <div className='midbar'>
            <div className='breadcrumb'>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    {breadcrumbs_list.map((bl, i) => 
                        <Link key={i} className='breadcrumb-link' to=''  >{bl}</Link>
                    )}
                </Breadcrumbs>
            </div>
            <div className='all-card'>
                {data && data.map((d, i) => 
                    <ProductCard key={i} product={d}/>
                )}
            </div>
            
        </div>
    )
}

export default Midbar
