import React, { useEffect, useState } from "react";
import Products from "./Products";
import "./productsPage.css";
import { useTranslation } from "react-i18next";
import { Button, colors } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  FilterByCategory,
  GetProducts,
  SortSelect,
  FilterByPrice,
  AddToWished,
  ColorFilter
} from "../../redux/actions";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";

function ProductsPage() {

  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState("");
  const [price1, setPrice1] = useState(null);
  const [price2, setPrice2] = useState(null);
  const [color, setColor] = useState([])


  const { products, filteredProducts } = useSelector(
    (state) => state.ProductReducer
  );
  const { wishedData } = useSelector((state) => state.CartReducer);

  const [pageNumber, setPageNumber] = useState(0);

  const productsPerPage = 12;

  const pagesVisited = pageNumber * productsPerPage;

  const pageCount = Math.ceil(products / productsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetProducts());
  }, []);

  const handleChange = (val, check) => {
    setChecked(check);
    setValue(val);
    console.log(value);
  };
  const handlePrice1Change = (val) => {
    setPrice1(val);
  };
  const handlePrice2Change = (val) => {
    setPrice2(val);
  };

  const CategoryFilter = (e) => {
    if(checked === true) {
      dispatch(FilterByCategory(value))
    }
    if(color.length > 0) {
      dispatch(ColorFilter(color))
    }
    if(price1 !== null && price2 !== null) {
      dispatch(FilterByPrice(price1, price2))
    }
    else {
      GetProducts()
    }
  };

  const sorting = (val) => {
    if (val !== "") {
      dispatch(SortSelect(val));
    } else {
      dispatch(GetProducts());
    }
  };
  const Reset = () => {
    document.getElementById("category1").checked = false;
    document.getElementById("category2").checked = false;
    document.getElementById("category3").checked = false;
    document.getElementById("category4").checked = false;
    document.getElementById("price1").value = "";
    document.getElementById("price2").value = "";
    dispatch(GetProducts());
    setColor([])
    var cols = document.getElementsByClassName('color');
    for(let i=0; i<cols.length; i++) {
      cols[i].style.boxShadow = 'none';
      cols[i].checked =false
    }
  };

  const handleCLick = (id, amount) => {
    dispatch(AddToWished(id, amount));
  };

  const colorsFunc = (e) => {
    if(e.target.checked === false){
      e.target.checked = true
      color.push(e.target.name)
      e.target.style.boxShadow = '0 0 0 3px rgb(66 153 225 / 50%)'
    }
    else if(e.target.checked === true) {
      e.target.checked = false
      color.splice(color.indexOf(e.target.name), 1)
      e.target.style.boxShadow = ""
    }
  }

  return (
    <div className="ProductsPage">
      <div className="filter">
        <h3 className="filterByProductspageP">{t("Filter By")}</h3>
        <div className="categoriesFilterProductsPage">
          <div className="productTypeFilter">
            <h4>{t("Product Type")}</h4>
            <div className="option">
              <input
                onChange={(event) =>
                  handleChange(event.target.value, event.target.checked)
                }
                id="category1"
                type="checkbox"
                value="Earring"
                className="cursor"
              />
              <label className="cursor" for="category1">{t("Earrings")}</label>
            </div>
            <div className="option">
              <input
                onChange={(event) =>
                  handleChange(event.target.value, event.target.checked)
                }
                id="category2"
                type="checkbox"
                value="Ring"
                className="cursor"
              />
              <label className="cursor" for="category2">{t("Rings")}</label>
            </div>
            <div className="option">
              <input
                onChange={(event) =>
                  handleChange(event.target.value, event.target.checked)
                }
                id="category3"
                type="checkbox"
                value="Necklace"
                className="cursor"
              />
              <label className="cursor" for="category3">{t("Necklaces")}</label>
            </div>
            <div className="option">
              <input
                onChange={(event) =>
                  handleChange(event.target.value, event.target.checked)
                }
                id="category4"
                type="checkbox"
                value="Brooche"
                className="cursor"
              />
              <label className="cursor" for="category4">{t("Brooches")}</label>
            </div>
          </div>
          <div className="ColorsFilter">
            <h4>{t("Color")}</h4>
            <div className="colorContainer">
                <input onClick={(e) => colorsFunc(e)} style={{backgroundColor: "#ff2424"}} className="color" name="red" type="button" />
                <input onClick={(e) => colorsFunc(e)} style={{backgroundColor: "white"}} className="color" name="white" type="button" />
                <input onClick={(e) => colorsFunc(e)} style={{backgroundColor: "black"}} className="color" name="black" type="button" />
                <input onClick={(e) => colorsFunc(e)} style={{backgroundColor: "#ffd336"}} className="color" name="yellow" type="button" />
                <input onClick={(e) => colorsFunc(e)} style={{backgroundColor: "#3275f0"}} className="color" name="blue" type="button" />
            </div>
          </div>
          <div className="price">
            <h4>{t("Price")}</h4>
            <div className="priceOption">
              <input
                onChange={(event) => handlePrice1Change(event.target.value)}
                id="price1"
                type="number"
                min="0"
                step="any"
                placeholder={t("From")}
              />
              <span>-</span>
              <input
                onChange={(event) => handlePrice2Change(event.target.value)}
                id="price2"
                type="number"
                min="0"
                step="any"
                placeholder={t("To")}
              />
            </div>
          </div>
          <div className="productPageButtonsFilter">
            <Button id="filterButton" onClick={(e) => CategoryFilter(e)} variant="contained">
              {t("Filter")}
            </Button>
            <Button onClick={() => Reset()} variant="contained">
              {t("Reset")}
            </Button>
          </div>
        </div>
      </div>
      <div className="production">
        <div className="productTopPart">
          <h3>{t("Production")}</h3>
          <select
            name="sort"
            id="product"
            onChange={(event) => sorting(event.target.value)}
          >
            <option value="">{t("Sort by")}</option>
            <option value="az">{t("A-Z")}</option>
            <option value="za">{t("Z-A")}</option>
            <option value="lowHigh">
              {t("Price")}: {t("Low to High")}
            </option>
            <option value="highLow">
              {t("Price")}: {t("High to Low")}
            </option>
          </select>
        </div>
        <div className="productionGrid">
          {/* or filtered products ?  */}
          {products &&
            products
              .slice(pagesVisited, pagesVisited + productsPerPage)
              .map((item) => {
                return (
                  <div className="singleProductionCard">
                    <Link to={`/production/single/${item.id}`}>
                      <img src={item.photo} />
                    </Link>
                    <button onClick={() => handleCLick(item.id, item.quantity)}>
                      {wishedData.find((x) => x.id === item.id) ? (
                        <FavoriteOutlinedIcon style={{ color: "#f50057" }} />
                      ) : (
                        <FavoriteBorderOutlinedIcon />
                      )}
                    </button>
                    <div className="descAndCateg">
                      <p>{t(item.title)}</p>
                      <p className="productCategoryCard">{t(item.category)}</p>
                    </div>
                    <p className="productCardPrice">{item.price}</p>
                  </div>
                );
              })}
        </div>
        <br />
        <br />
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
  );
}

export default ProductsPage;
