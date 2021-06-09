import React, {useEffect, useState} from 'react'
import Products from './Products'
import './productsPage.css'
import { useTranslation } from "react-i18next";
import {Button} from '@material-ui/core'
import {useSelector, useDispatch} from "react-redux"
import {FilterByCategory, GetProducts, SortSelect, FilterByPrice} from "../../redux/actions"

function ProductsPage() {

    const [checked, setChecked] = useState(false)
    const [value, setValue] = useState("")
    const [price1, setPrice1] = useState(null)
    const [price2, setPrice2] = useState(null)


    const dispatch = useDispatch()

    useEffect(() => {
    }, [])
    
    const {t} = useTranslation()
    
    const {products} = useSelector(state => state.ProductReducer)
    
    const handleChange = (val, check) => {
        setChecked(check)
        setValue(val)
    }
    const handlePrice1Change = (val) => {
        setPrice1(val)
    }
    const handlePrice2Change = (val) => {
        setPrice2(val)
    }

    const CategoryFilter = () => {
        if(checked == true) {
            dispatch(FilterByCategory(value))
        } else if(price1 !== null && price2 !== null) {
            dispatch(FilterByPrice(price1, price2))
        }
        else {
            dispatch(GetProducts())
        }
    }

    const sorting = (val) => {
        if(val !== "") {
            dispatch(SortSelect(val))
        } else {
            dispatch(GetProducts())
        }
    }
    const Reset = () => {
        document.getElementById("category1").checked = false
        document.getElementById("category2").checked = false
        document.getElementById("category3").checked = false
        document.getElementById("category4").checked = false
        // document.getElementById("mood1").checked = false
        // document.getElementById("mood2").checked = false
        // document.getElementById("mood3").checked = false
        // document.getElementById("mood4").checked = false
        document.getElementById("price1").value = ""
        document.getElementById("price2").value = ""  
        console.log(document.getElementById("price1").value)
        dispatch(GetProducts())
    }


    return (
        <div className="ProductsPage">
            <div >
                <h3 className="filterByProductspageP">{t('Filter By')}</h3>
                <div className="categoriesFilterProductsPage">
                    <div className="productTypeFilter">
                        <h4>{t('Product Type')}</h4>
                        <div className="option">
                            <input onChange={(event) => handleChange(event.target.value, event.target.checked)}  id="category1" type="checkbox" value="Earring"/>
                            <label for="category1">{t('Earrings')}</label>
                        </div>
                        <div className="option">
                            <input onChange={(event) => handleChange(event.target.value, event.target.checked)}  id="category2" type="checkbox" value="Ring"/>
                            <label for="category2">{t('Rings')}</label>
                        </div>
                        <div className="option">
                            <input onChange={(event) => handleChange(event.target.value, event.target.checked)}  id="category3" type="checkbox" value="Necklace"/>
                            <label for="category3">{t('Necklaces')}</label>
                        </div>
                        <div className="option">
                            <input onChange={(event) => handleChange(event.target.value, event.target.checked)}  id="category4" type="checkbox" value="Brooche"/>
                            <label for="category4">{t('Brooches')}</label>
                        </div>
                    </div>
                    <div className="CategoriesFilter">
                        <h4>{t('Categories')}</h4>
                        <div className="option">
                            <input onChange={(event) => handleChange(event.target.value, event.target.checked)}  type="checkbox" id="mood1" value="idkyet"/>
                            <label for="mood1">idkyet</label>
                        </div>
                        <div className="option">
                            <input onChange={(event) => handleChange(event.target.value, event.target.checked)}  type="checkbox" id="mood2" value="idkyet"/>
                            <label for="mood2">idkyet</label>
                        </div>
                        <div className="option">
                            <input onChange={(event) => handleChange(event.target.value, event.target.checked)}  type="checkbox" name="mood3" value="idkyet"/>
                            <label for="mood3">idkyet</label>
                        </div>
                        <div className="option">
                            <input onChange={(event) => handleChange(event.target.value, event.target.checked)}  type="checkbox" name="mood4" value="idkyet"/>
                            <label for="mood4">idkyet</label>
                        </div>
                    </div>
                    <div className="price">
                        <h4>{t('Price')}</h4>
                        <div className="priceOption">
                            <input onChange={(event) => handlePrice1Change(event.target.value)} id="price1" type="number" min="0" step="any" placeholder={t('From')} />
                            <span>-</span>
                            <input onChange={(event) => handlePrice2Change(event.target.value)} id="price2" type="number" min="0"  step="any" placeholder={t('To')} />
                        </div>
                    </div>
                    <div className="productPageButtonsFilter">
                        <Button onClick={() => CategoryFilter()} variant="contained">{t('Filter')}</Button>
                        <Button onClick={() => Reset()}variant="contained">{t('Reset')}</Button>
                    </div>
                </div>
            </div>
            <div className="production">
                <div className="productTopPart">
                    <h3>{t('Production')}</h3>
                        <select name="sort" id="product" onChange={(event) => sorting(event.target.value)}>
                            <option value="">{t('Sort by')}</option>
                            <option value="az">{t('A-Z')}</option>
                            <option value="za">{t('Z-A')}</option>
                            <option value="lowHigh">{t('Price')}: {t('Low to High')}</option>
                            <option value="highLow">{t('Price')}: {t('High to Low')}</option>
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
