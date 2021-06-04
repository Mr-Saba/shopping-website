import React, {useEffect} from 'react'
import Products from './Products'
import './productsPage.css'
function ProductsPage() {


    return (
        <div className="ProductsPage">
            <div className="filter">
                <h3 className="filterByProductspageP">Filter by</h3>
                <div className="categoriesFilterProductsPage">
                    <div className="productTypeFilter">
                        <h4>Product type</h4>
                        <div className="option">
                            <input type="checkbox" name="category1" value="Earrings"/>
                            <label for="category1">Earrings</label>
                        </div>
                        <div className="option">
                            <input type="checkbox" name="category2" value="Rings"/>
                            <label for="category2">Rings</label>
                        </div>
                        <div className="option">
                            <input type="checkbox" name="category3" value="Necklaces"/>
                            <label for="category3">Necklaces</label>
                        </div>
                        <div className="option">
                            <input type="checkbox" name="category4" value="Brooches"/>
                            <label for="category4">Brooches</label>
                        </div>
                    </div>
                    <div className="CategoriesFilter">
                        <h4>Categories</h4>
                        <div className="option">
                            <input type="checkbox" name="mood1" value="idkyet"/>
                            <label for="mood1">idkyet</label>
                        </div>
                        <div className="option">
                            <input type="checkbox" name="mood2" value="idkyet"/>
                            <label for="mood2">idkyet</label>
                        </div>
                        <div className="option">
                            <input type="checkbox" name="mood3" value="idkyet"/>
                            <label for="mood3">idkyet</label>
                        </div>
                        <div className="option">
                            <input type="checkbox" name="mood4" value="idkyet"/>
                            <label for="mood4">idkyet</label>
                        </div>
                    </div>
                    <div className="price">
                        <h4>Price</h4>
                        <div className="priceOption">
                            <input type="number" min="0" step="any" placeholder="From" />
                            <span>-</span>
                            <input type="number" min="0"  step="any" placeholder="To" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="production">
                <div className="productTopPart">
                    <h3>Production</h3>
                        <select name="sort" id="product">
                            <option value>Sort by</option>
                            <option value="az">A-Z</option>
                            <option value="za">Z-A</option>
                            <option value="lowHigh">Price: Low to High</option>
                            <option value="highLow">Price: High to Low</option>
                        </select>
                </div>
                <div className="productionGrid">
                    <Products/>
                </div>
            </div>
        </div>
    )
    }

export default ProductsPage
