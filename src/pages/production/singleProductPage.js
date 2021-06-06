import React from 'react'
import {Link, useParams} from 'react-router-dom'
import products from "../../data/products.json"

function SingleProductPage() {

    const params = useParams()

    const Product = products.find(item=>item.id == params.id)

    return (
        <div>
            <p>{Product.title}</p>
        </div>
    )
}

export default SingleProductPage
