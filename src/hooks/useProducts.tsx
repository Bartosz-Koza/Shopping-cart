import { useContext } from "react";
import ProductsContext from "../context/ProductProvidier";
import { UseProductsContextType } from "../context/ProductProvidier";

const useProducts = (): UseProductsContextType =>{
    return useContext(ProductsContext)
}

export default useProducts;