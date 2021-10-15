import React from 'react'
import {Link} from 'react-router-dom'
import Card from "../components/Card";
function Favorites({items, onFavorite}){
    return(
        <section className='favorites'>
            <div className='container'>

            {items.length>0 ?
                <div>
                    <div className='flex'>
                        {
                            items
                                .map((item, index) => (
                                    <Card
                                        key={index}
                                        favorited={true}
                                        onFav={onFavorite}
                                        {...item}
                                    />
                                ))
                        }
                    </div>
                </div>
                 :
                <div className='emptyFavorites'>
                    <img src={process.env.PUBLIC_URL + '/img/emoji.png'} alt='' />
                    <h3>Закладок нет :(</h3>
                    <p>Вы ничего не добавляли в закладки</p>
                    <Link to={process.env.PUBLIC_URL + '/'}>
                        <button className="btn">
                            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 7H14.7143" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Вернуться назад
                        </button>
                    </Link>
                </div>

            }
            </div>
        </section>
    )
}
export default Favorites;