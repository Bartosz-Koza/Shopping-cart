import { CartItemType } from "../context/CardProvider"
import { ReducerAction } from "../context/CardProvider"
import { ReducerActionType } from "../context/CardProvider"
import { ChangeEvent, ReactElement, memo } from 'react';

type PropsType ={
    item: CartItemType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType
}



export const CartLineItem = ({item, dispatch, REDUCER_ACTIONS}: PropsType) => {
    const img: string = new URL(`../images/${item.sku}.jpg`,
    import.meta.url).href
  

    const lineTotal: number = (item.qty * item.price)
  
    const highestQty: number = 20 > item.qty ? 20 : item.qty

    const optionValues: number[] = [...Array(highestQty).keys()].map(i => i + 1)

    const options: ReactElement[] = optionValues.map(val => {
        return <option key={`opt${val}`} value={val}>{val}</option>
    })

    const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) =>{
        dispatch({
            type: REDUCER_ACTIONS.QUANTITY,
            payload: { ...item, qty: Number(e.target.value)}
        })
    }

    const onRemoveFromCart = () => dispatch({
        type: REDUCER_ACTIONS.REMOVE,
        payload: item,

    })

    const content = (
        <li className="cart__item">
            <img src={img} alt={item.name} className="cart__img" />
            <div aria-label="ITEM NAME">{item.name}</div> 
            <div aria-label="PRICE PER ITEM">{new Intl.NumberFormat('ren-US', {style: 'currency', currency: 'PLN'}).format(item.price)}</div> 
        
            <label htmlFor="itemQty" className="offscreen">
                ITEM QUANTITY
            </label>
            <select name="itemQty" id="itemQty" className="cart_select" 
            value={item.qty}
            aria-label = 'ITEM QUANTITY'
            onChange={onChangeQty}
            >{options}</select>

            <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
                {new Intl.NumberFormat('ren-US', {style: 'currency', currency: 'PLN'}).format(lineTotal)}
            </div>

            <button 
             aria-label="REMOVE ITEM FORM CART"
             title="REMOVE ITEM"
             onClick={onRemoveFromCart}               
            className="cart__button">DELETE</button>
        </li>
    )

    return content
}
function eqItems({item: prevItem}: PropsType, {item: nextItem }: PropsType){
    return Object.keys(prevItem).every(key => {
        return prevItem[key as keyof CartItemType] === nextItem[key as keyof CartItemType]
    })
}

const MemoizedCartItem = memo<typeof CartLineItem>(CartLineItem, eqItems)

export default MemoizedCartItem;