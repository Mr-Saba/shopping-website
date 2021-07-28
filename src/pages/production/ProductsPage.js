import React, { useEffect, useState } from 'react'
import Products from './Products'
import './productsPage.css'
import { useTranslation } from "react-i18next";
import { Button } from '@material-ui/core'
import { useSelector, useDispatch } from "react-redux"
import { FilterByCategory, GetProducts, SortSelect, FilterByPrice, AddToWished } from "../../redux/actions"
import ReactPaginate from "react-paginate"
import { Link } from "react-router-dom"
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';




function ProductsPage() {

    const [checked, setChecked] = useState(false)
    const [value, setValue] = useState("")
    const [price1, setPrice1] = useState(null)
    const [price2, setPrice2] = useState(null)

    const { products, filteredProducts } = useSelector(state => state.ProductReducer)
    const { wishedData } = useSelector(state => state.CartReducer)


    const [pageNumber, setPageNumber] = useState(0)

    const productsPerPage = 12

    const pagesVisited = pageNumber * productsPerPage

    const pageCount = Math.ceil(products / productsPerPage)

    const changePage = ({ selected }) => {
        setPageNumber(selected)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    
    const { t } = useTranslation()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetProducts())
    }, [])



    const handleChange = (val, check) => {
        setChecked(check)
        setValue(val)
        console.log(value)
    }
    const handlePrice1Change = (val) => {
        setPrice1(val)
    }
    const handlePrice2Change = (val) => {
        setPrice2(val)
    }

    const CategoryFilter = () => {
        if (checked == true && price1 == null && price2 == null ) {
            dispatch(FilterByCategory(value))
            console.log("here1")
        } else if (price1 !== null && price2 !== null && checked !== true) {
            dispatch(FilterByPrice(price1, price2))
            setPrice1(null)
            setPrice2(null)
        }
        else if (price1 !== null && price2 !== null && checked == true) {
            console.log("here")
            dispatch(FilterByCategory(value))
            dispatch(FilterByPrice(price1, price2))
        }
        else {
            dispatch(GetProducts())
        }
    }

    const sorting = (val) => {
        if (val !== "") {
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
        document.getElementById("price1").value = ""
        document.getElementById("price2").value = ""
        dispatch(GetProducts())
    }

    const handleCLick = (id) => {
        dispatch(AddToWished(id))
    }


    return (
        <div className="ProductsPage">
            <div className="filter">
                <h3 className="filterByProductspageP">{t('Filter By')}</h3>
                <div className="categoriesFilterProductsPage">
                    <div className="productTypeFilter">
                        <h4>{t('Product Type')}</h4>
                        <div className="option">
                            <input onChange={(event) => handleChange(event.target.value, event.target.checked)} id="category1" type="checkbox" value="Earring" />
                            <label for="category1">{t('Earrings')}</label>
                        </div>
                        <div className="option">
                            <input onChange={(event) => handleChange(event.target.value, event.target.checked)} id="category2" type="checkbox" value="Ring" />
                            <label for="category2">{t('Rings')}</label>
                        </div>
                        <div className="option">
                            <input onChange={(event) => handleChange(event.target.value, event.target.checked)} id="category3" type="checkbox" value="Necklace" />
                            <label for="category3">{t('Necklaces')}</label>
                        </div>
                        <div className="option">
                            <input onChange={(event) => handleChange(event.target.value, event.target.checked)} id="category4" type="checkbox" value="Brooche" />
                            <label for="category4">{t('Brooches')}</label>
                        </div>
                    </div>
                    <div className="CategoriesFilter">
                        <h4>{t('Categories')}</h4>
                        <div className="option">
                            <input onChange={(event) => handleChange(event.target.value, event.target.checked)} type="checkbox" id="mood1" value="idkyet" />
                            <label for="mood1">idkyet</label>
                        </div>
                        <div className="option">
                            <input onChange={(event) => handleChange(event.target.value, event.target.checked)} type="checkbox" id="mood2" value="idkyet" />
                            <label for="mood2">idkyet</label>
                        </div>
                        <div className="option">
                            <input onChange={(event) => handleChange(event.target.value, event.target.checked)} type="checkbox" name="mood3" value="idkyet" />
                            <label for="mood3">idkyet</label>
                        </div>
                        <div className="option">
                            <input onChange={(event) => handleChange(event.target.value, event.target.checked)} type="checkbox" name="mood4" value="idkyet" />
                            <label for="mood4">idkyet</label>
                        </div>
                    </div>
                    <div className="price">
                        <h4>{t('Price')}</h4>
                        <div className="priceOption">
                            <input onChange={(event) => handlePrice1Change(event.target.value)} id="price1" type="number" min="0" step="any" placeholder={t('From')} />
                            <span>-</span>
                            <input onChange={(event) => handlePrice2Change(event.target.value)} id="price2" type="number" min="0" step="any" placeholder={t('To')} />
                        </div>
                    </div>
                    <div className="productPageButtonsFilter">
                        <Button onClick={() => CategoryFilter()} variant="contained">{t('Filter')}</Button>
                        <Button onClick={() => Reset()} variant="contained">{t('Reset')}</Button>
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
                    {/* or filtered products ?  */}
                    {filteredProducts && filteredProducts.slice(pagesVisited, pagesVisited + productsPerPage).map(item => {
                        return (
                            <div className="singleProductionCard">
                                    <Link to={`/production/single/${item.id}`}>
                                        <img src={item.photo} />
                                    </Link>
                                    <button onClick={() => handleCLick(item.id)}>
                                    {
                                    wishedData.find(x => x.id === item.id) ? 
                                    <FavoriteOutlinedIcon style={{ "color": "#f50057" }} /> :
                                    <FavoriteBorderOutlinedIcon /> 
                                    }
                                    </button>
                                        <div className="descAndCateg">
                                            <p>{t(item.title)}</p>
                                            <p className="productCategoryCard">{t(item.category)}</p>
                                        </div>
                                        <p className="productCardPrice">{item.price}</p>
                                </div>
                        )
                    })
                    }
                </div>
                <br/>
                <br/>
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />
            </div>
        </div>
    )
}

export default ProductsPage
