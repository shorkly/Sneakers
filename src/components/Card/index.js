import React from 'react'
import style from './Card.module.scss'

function Card({ id, img, name, price, onFav, onPlus, favorited=false }){
    const [isAdded, setIsAdded] = React.useState(false);
    const [isLiked, setIsLiked] = React.useState(favorited);
    const addToCart = () => {
        onPlus({img, name, price});
        setIsAdded(!isAdded);
    }
    const addToFav = () => {
        onFav({id, img, name, price});
        setIsLiked(!isLiked);
    }
    return (
        <div className={style.card}>
                <img className={style.like} onClick={addToFav}
                    src={isLiked ? 'img/liked.svg' : 'img/like.svg'} alt='' />
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