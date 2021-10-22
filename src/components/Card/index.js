import React from 'react'
import style from './Card.module.scss'
import MyLoader from "../MyLoader";
import {AppContext} from "../../App";
//import {Route} from "react-router-dom";

function Card({ id, img, name,
                  price, onFav,
                  onPlus,added= false,
                  favorited=false,
                  loading = false }){
    const {getAddedItems} = React.useContext(AppContext);
    //const [isAdded, setIsAdded] = React.useState(added);
    const [isLiked, setIsLiked] = React.useState(favorited);
    const obj = {id, parentId: id, img, name, price};

    const addToCart = () => {
        onPlus(obj);
        // setIsAdded(!isAdded);
    }
    const addToFav = () => {
        onFav(obj);
        setIsLiked(!isLiked);
    }
    return (
        <div className={style.card}>
        {
        loading ? <MyLoader/> :
            <>
                {onFav && <img className={style.like} onClick={addToFav}
                      src={isLiked ? 'img/liked.svg' : 'img/like.svg'} alt=''/>}
                <img className={style.sneakersPhoto} src={img} alt='' />
                <div className={style.name}>{name}</div>
                <div className={style.price}>
                    <span className={style.priceName}>Цена: </span>
                    <span className={style.priceNumber}>{price} руб.</span>
                </div>
                {onPlus && <img className={style.add} onClick={addToCart}
                      src={getAddedItems(id) ? 'img/check.svg' : 'img/add.svg'} alt=''/>}
                {/*если этот id есть в cartItems тогда говори true иначе false */}
            </>
        }
        </div>

)
}
export default Card;