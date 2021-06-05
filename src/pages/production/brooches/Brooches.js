import React from 'react'
import products from "../../../data/products.json"
import '../products.css'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

function Brooches() {
    return (
        <div>   
        { products.map(item => {
            if(item.category == "Brooch") {
                return (
                    <div className="singleProductionCard">
                        <img src={item.photo} />
                        <button><FavoriteBorderOutlinedIcon/></button>
                        <div className="descAndCateg">
                            <p>{item.title}</p>
                            <p className="productCategoryCard">{item.category}</p>
                        </div>
                        <p className="productCardPrice">{item.price}</p>
                    </div>
                )
            }})}
        </div>
    )
}

export default Brooches
