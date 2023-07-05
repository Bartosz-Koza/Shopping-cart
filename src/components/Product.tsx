import { ProductType } from "../context/ProductProvidier"
import { ReducerActionType } from "../context/CardProvider"
import { ReducerAction } from "../context/CardProvider"
import { ReactElement } from 'react';

type PropsType = {
    product: ProductType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType,
    inCart: boolean,
}

export const Product = ({ product, dispatch, REDUCER_ACTIONS, inCart}: PropsType): ReactElement   => {
  
  const img: string = new URL(`../images/${product.sku}.jpg`,
  import.meta.url).href

  const onAddToCart = () => dispatch({ type: REDUCER_ACTIONS.ADD, payload: {...product, qty:1}})

  const itemInCart = inCart ? 'ITEM IN CART 👍' : null
  
    const content = 
        <article className="product">
            <h3>{product.name}</h3>
            <img src={img} alt={product.name} className="product_img" />
            <p>{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'PLN'}).format(product.price)}{itemInCart}</p>
            <button onClick={onAddToCart}>ADD TO CART</button>
        </article>

    
    return content
}
