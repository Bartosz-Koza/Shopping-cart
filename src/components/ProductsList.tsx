import useCart from "../hooks/useCart"
import useProducts from "../hooks/useProducts"
import { UseProductsContextType } from "../context/ProductProvidier"
import { ReactElement } from 'react';
import { Product } from "./Product";


export const ProductsList = () => {
  const {dispatch, REDUCER_ACTIONS, cart} = useCart()
  const {products} = useProducts()
  
  let pageContent: ReactElement | ReactElement[] = <p>Loading....</p>

  if(products?.length){
    pageContent = products.map(products =>{
        const inCart: boolean = cart.some(item => item.sku === products.sku)
        
        return(
            <Product
            key={products.sku}
            product={products}
            dispatch={dispatch}
            REDUCER_ACTIONS={REDUCER_ACTIONS}
            inCart={inCart}
            />

        )
    })
  }

  const content = (
    <main className="main main--products">
        {pageContent}
    </main>
  )

  return content
}
