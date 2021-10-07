import React from 'react'
import style from './Card.module.scss'

function Card({ img, name, price, onFav, onPlus }){
    const [isAdded, setIsAdded] = React.useState(false);
    const addToCart = () => {
        onPlus({img, name, price});
        setIsAdded(!isAdded);
    }
    return (
        <div className={style.card}>
            <div  className={style.like} onClick={onFav}>
                <img src={'img/like.svg'} alt='' />
            </div>
            <img className={style.sneakersPhoto} src={img} alt='' />
            <div className={style.name}>{name}</div>
            <div className={style.price}>
                <span className={style.priceName}>Цена: </span>
                <span className={style.priceNumber}>{price} руб.</span>
            </div>
            <img  className={style.add} onClick={addToCart}
                  src={isAdded ? 'img/check.svg' : 'img/add.svg'} alt='' />
        </div>
    )
}
export default Card;