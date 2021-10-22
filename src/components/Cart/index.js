import style from './Cart.module.scss'
import {AppContext} from "../../App";
import React from "react";
import axios from "axios";

//const delay = (ms) => new Promise((resolve)=> setTimeout(resolve, ms)); // ***

function Cart({onClose, onRemove, items = []}){
    const {cartItems, setCartItems} = React.useContext(AppContext);
    const [orderId, setOrderId]  = React.useState(null);
    const [checkout, setCheckout]  = React.useState(false);
    const [btnLoading, setBtnLoading]  = React.useState(false);
    const totalPrice = (cartItems.reduce((sum, obj) => obj.price + sum, 0));

    const onClickOrder = async ()=>{
try {
    // debugger
    const {data} = await axios.post('https://6137be32eac1410017c18470.mockapi.io/orders', {
        items: cartItems
        });
    setBtnLoading(true);
    setOrderId(data.id);
    setCheckout(true);
    setCartItems([]);

    for (let i = 0; i < cartItems.length; i++){
        const item = cartItems[i];
        await axios.delete('https://6137be32eac1410017c18470.mockapi.io/cart', item.id);
        //await delay(1000)
    }
}catch (error) {
    console.log('Не удалось оформить заказ')
}
    setBtnLoading(false);
    }
    return(
        <div className={style.shadow}>
        <div className={style.box}>
          <div className={style.topBox}>
            <h3>Корзина</h3>
            <button className={style.closingBtn} onClick={onClose}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.0799 10.6155L9.6311 8.16673L12.0798 5.71801C13.0241 4.77376 11.5596 3.30934 10.6154 4.25359L8.16668 6.70231L5.71787 4.2535C4.77384 3.30947 3.30947 4.77384 4.2535 5.71787L6.70231 8.16668L4.25359 10.6154C3.30934 11.5596 4.77376 13.0241 5.71801 12.0798L8.16673 9.6311L10.6155 12.0799C11.5597 13.0241 13.0241 11.5597 12.0799 10.6155Z" fill="#D3D3D3"/>
                </svg>
            </button>
            {
              items.length>0 ?
                  <>
              <div className={style.cartItems}>
              {items.map((obj)=>(
                  <div key={obj.id} className={style.sneakersItem}>
                      <div className={style.productPh}>
                        <img width={70} src={obj.img} alt='' />
                      </div>
                      <div className={style.namePrice}>
                        <p>{obj.name}</p>
                        <span>{obj.price} руб.</span>
                      </div>
                      <button onClick={()=>onRemove(obj.id)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0799 10.6155L9.6311 8.16673L12.0798 5.71801C13.0241 4.77376 11.5596 3.30934 10.6154 4.25359L8.16668 6.70231L5.71787 4.2535C4.77384 3.30947 3.30947 4.77384 4.2535 5.71787L6.70231 8.16668L4.25359 10.6154C3.30934 11.5596 4.77376 13.0241 5.71801 12.0798L8.16673 9.6311L10.6155 12.0799C11.5597 13.0241 13.0241 11.5597 12.0799 10.6155Z" fill="#D3D3D3"/>
                        </svg>
                      </button>
                  </div>
              ))}
                  </div>
                  <div className={style.bottomBox}>
                          <ul>
                              <li><span>Итого:</span> <b>{totalPrice} руб.</b></li>
                              <li><span>Налог 5%:</span> <b>{Math.round(totalPrice/100*5)} руб.</b></li>
                          </ul>
                          <button disabled={btnLoading} className={style.btn} onClick={onClickOrder}>Оформить заказ
                              <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M1 7H14.7143" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                          </button>
                      </div>
            </> :
            <div className={style.emptyCart}>
              <img src={checkout? 'img/checkout.jpg':'img/cartBox.png'} alt='' />
              <h3>{checkout?'Заказ оформлен!':'Корзина пустая'}</h3>
              <p>{checkout? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                  :'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}</p>
              <button className={style.btn} onClick={onClose}>
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7H14.7143" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Вернуться назад
              </button>
            </div>
            }
          </div>
        </div>
      </div>
    )
}
export default Cart;