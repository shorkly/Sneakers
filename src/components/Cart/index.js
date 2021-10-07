import style from './Cart.module.scss'
function Cart({onClose, onRemove, items = []}){
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
              <div className={style.cartItems}>
              {items.map((obj)=>(
                <div>
                  <div className={style.sneakersItem}>
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
                  <div className={style.bottomBox}>
                      <ul>
                      <li><span>Итого:</span> <b>21 498 руб.</b></li>
                      <li><span>Налог 5%:</span> <b>1074 руб.</b></li>
                      </ul>
                      <button className={style.btn}>Оформить заказ
                          <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 7H14.7143" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                      </button>
                  </div>
                </div>
              ))}
            </div> :
            <div className={style.emptyCart}>
              <img src={'img/cartBox.png'} alt='' />
              <h3>Корзина пустая</h3>
              <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
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