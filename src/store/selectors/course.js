import { selector } from "recoil";
import { productState } from "../atoms/course";

export const isproductLoading = selector({
  key:'isProductLoadingState',
  get: ({get}) =>{
    const state = get(productState)

    return state.isLoading
  },
});

export const productDetails = selector({
  key: 'ProductDetailsState',
  get: ({get}) =>{
    const state = get(productState)

    return state.product;
  },
});

export const productTitle = selector({
  key: 'productTitleState',
  get: ({get}) =>{
    const state = get(productState)
    if(state.product){
      return state.product.title;
    }
    return "product not found"
  },
});

export const productPrice = selector({
  key: 'productPriceState',
  get: ({get}) =>{
    const state = get(productState)
    if(state.product){
      return state.product.price;
    }
    return "";
  },
});
export const productStock = selector({
  key: 'productStockState',
  get: ({get}) =>{
    const state = get(productState)
    if(state.product){
      return state.product.stock;
    }
    return "";
  },
});

export const productImage = selector({
  key: 'productImageState',
  get: ({ get }) => {
    const state = get(productState);

    if (state.product && state.product.image) {
      // Assuming that the 'image' property is a valid URL or base64 string
      return state.product.image;
    }

    // Return a default image or handle the case where the image is not found
    return "image not found";
  },
});


export const productDescription = selector({
  key:'productDescriptionState',
  get: ({get}) =>{
    const state = get(productState)
    if(state.product){
      return state.product.description
    }
    return ""
  }, 
});