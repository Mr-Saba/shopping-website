import {
  GET_PRODUCTS,
  SEARCH_PRODUCTS,
  FILTER_BY_CATEGORY,
  SORT_SELECT,
  FILTER_BY_PRICE,
  ADD_ADDRESS,
  REMOVE_ADDRESS,
  COLOR_FILTER,
} from "../constants";
import { auth, firebase, firestore } from "../../firebase/Configuration"

const initialState = {
  products: null,
  filteredProducts: [],
};
const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      state.filteredProducts = [];
      return {
        ...state,
        products: action.payload,
      };
    case SEARCH_PRODUCTS:
      const filteredData = state.products.filter((item) => {
        console.log(item.title);
        if (item.title.toLowerCase().includes(action.payload.toLowerCase())) {
          return item;
        }
      });
      return {
        ...state,
        products: [...filteredData],
      };
    case FILTER_BY_CATEGORY:
      state.products = action.payload.products
      let filteredData1
      if(state.filteredProducts.length === 0) {
         filteredData1 = state.products.filter((item) => {
          if (item.category === action.payload.value) {
            state.filteredProducts.push(item);
            return item;
          }
        });
      } else {
        filteredData1 = state.filteredProducts.filter((item) => {
          if (item.category === action.payload.value) {
            state.filteredProducts.push(item);
            return item;
          }
        });
      }
      return {
        ...state,
        products: [...filteredData1],
      };
    case SORT_SELECT:
      let sortedData;
      if (action.payload == "az") {
        sortedData = state.products.sort(function (a, b) {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          }
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          }
          return 0;
        });
        return {
          ...state,
          products: [...sortedData],
        };
      }
      if (action.payload == "za") {
        sortedData = state.products.sort(function (a, b) {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return 1;
          }
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return -1;
          }
          return 0;
        });
        return {
          ...state,
          products: [...sortedData],
        };
      }
      if (action.payload == "lowHigh") {
        sortedData = state.products.sort(function (a, b) {
          const intA = parseInt(a.price.slice(0, -1));
          const intB = parseInt(b.price.slice(0, -1));
          return intA - intB;
        });
        return {
          ...state,
          products: [...sortedData],
        };
      }
      if (action.payload == "highLow") {
        sortedData = state.products.sort(function (a, b) {
          const intA = parseInt(a.price.slice(0, -1));
          const intB = parseInt(b.price.slice(0, -1));
          return intB - intA;
        });
        return {
          ...state,
          products: [...sortedData],
        };
      }
      break
    case FILTER_BY_PRICE:
      let filteredData3
      if(state.filteredProducts.length === 0) {
        filteredData3 = state.products.filter((item) => {
          let productPrice = parseInt(item.price.slice(0, -1));
          if (
            productPrice >= action.payload.price1 &&
            productPrice <= action.payload.price2
          ) {
            state.filteredProducts.push(item)
            return item;
          }
        })
      } else {
        console.log("here1")
        filteredData3 = state.filteredProducts.filter((item) => {
          let productPrice = parseInt(item.price.slice(0, -1));
          if (
            productPrice >= action.payload.price1 &&
            productPrice <= action.payload.price2
          ) {
            state.filteredProducts.push(item)
            return item;
          }
        })
      }
      return {
        ...state,
        products: [...filteredData3],
      };
      case COLOR_FILTER: 
      let filteredData4
        if(state.filteredProducts.length === 0) {
          console.log("here")
          filteredData4 = state.products.filter((item) => {
          for(let i=0; i<action.payload.length; i++) {
            if (item.color.toLowerCase().includes(action.payload[i].toLowerCase())) {
            state.filteredProducts.push(item);
            console.log(state.filteredProducts)
            console.log(state.filteredProducts.length)
            return item;
            }
          }
          });
        } else {
          filteredData4 = state.filteredProducts.filter((item) => {
            for(let i=0; i<action.payload.length; i++) {
              if (item.color.toLowerCase().includes(action.payload[i].toLowerCase())) {
              state.filteredProducts.push(item);
              return item;
              }
            }
            });
        }
      return {
          ...state,
          products: [...filteredData4],
      }
    default:
      return state;
  }
};

export default ProductReducer;
