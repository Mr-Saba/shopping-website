import React, {useEffect} from 'react'
import Products from './Products'
import './productsPage.css'
import { useTranslation } from "react-i18next";

function ProductsPage() {

    useEffect(() => {
    }, [])

    const {t} = useTranslation()


    return (
        <div className="ProductsPage">
            <div className="filter">
                <h3 className="filterByProductspageP">{t('Filter by')}</h3>
                <div className="categoriesFilterProductsPage">
                    <div className="productTypeFilter">
                        <h4>{t('Product type')}</h4>
                        <div className="option">
                            <input id="sas" type="checkbox" id="category1" value="Earrings"/>
                            <label for="category1">{t('Earrings')}</label>
                        </div>
                        <div className="option">
                            <input type="checkbox" id="category2" value="Rings"/>
                            <label for="category2">{t('Rings')}</label>
                        </div>
                        <div className="option">
                            <input type="checkbox" id="category3" value="Necklaces"/>
                            <label for="category3">{t('Necklaces')}</label>
                        </div>
                        <div className="option">
                            <input type="checkbox" id="category4" value="Brooches"/>
                            <label for="category4">{t('Brooches')}</label>
                        </div>
                    </div>
                    <div className="CategoriesFilter">
                        <h4>{t('Categories')}</h4>
                        <div className="option">
                            <input type="checkbox" id="mood1" value="idkyet"/>
                            <label for="mood1">idkyet</label>
                        </div>
                        <div className="option">
                            <input type="checkbox" id="mood2" value="idkyet"/>
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
                        <h4>{t('Price')}</h4>
                        <div className="priceOption">
                            <input type="number" min="0" step="any" placeholder={t('From')} />
                            <span>-</span>
                            <input type="number" min="0"  step="any" placeholder={t('To')} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="production">
                <div className="productTopPart">
                    <h3>{t('Production')}</h3>
                        <select name="sort" id="product">
                            <option value>{t('Sort by')}</option>
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
