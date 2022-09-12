import React from 'react'
import {Link} from "react-router-dom";
import '../product/Product.css';


const ProductItem = ({product}) => {
  return (
    <>
          <Link to={`/product/${product._id}`}>
            <div className="card">
              <img src={product.images[0].url} alt="product" className='flex-center'/>
              <h4>{product.brand}</h4>
              <p>{product.name}</p>
              <div className="card-price">
                <h2> Rs {product.sellingPrice} </h2>
                <span className="reteil-price">
                  <strike>Rs {product.retailPrice}</strike>
                </span>
                <span className="discount">({product.discount}% OFF)</span>
              </div>
            </div>
          </Link>
    </>
  )
}

export default ProductItem;