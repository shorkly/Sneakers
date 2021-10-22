import React from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import Card from "../components/Card";
// import {AppContext} from "../App";

function Orders({items=[]}) {
    // const {onAddToCart, onFavorite }= React.useContext(AppContext)
    const [orders, setOrders] = React.useState([]);
    const [isReady, setIsReady] = React.useState(true);

    React.useEffect(()=>{
        (async()=>{
            try{
                const {data} = await axios.get('https://6137be32eac1410017c18470.mockapi.io/orders');
                setOrders(data.reduce((prev, obj)=> [...prev, ...obj.items], []));
                setIsReady(false);
            }catch (error) {
                alert('Ошибка при запросе заказа')
            }
        })();
        },[]);
    return(
        <section className='orders'>
            <div className='container'>
                {/*{items.length>0 ?*/}
                    <>
                    <h2>Мои заказы</h2>
                    <div className='flex'>
                        {orders.map((item, index)=>(
                                <Card
                                    key={index}
                                    {...item}
                                    loading={isReady}
                                />
                            ))
                        }
                    </div>
                    </>
                {/*:*/}
                {/*    <div className='emptyOrders'>*/}
                {/*        <img src={process.env.PUBLIC_URL + '/img/emoji2.png'} alt='' />*/}
                {/*        <h3>У вас нет заказов</h3>*/}
                {/*        <p>Вы нищеброд?*/}
                {/*            Оформите хотя бы один заказ.</p>*/}
                {/*        <Link to={process.env.PUBLIC_URL + '/'}>*/}
                {/*            <button className="btn">*/}
                {/*                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                {/*                    <path d="M1 7H14.7143" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>*/}
                {/*                    <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>*/}
                {/*                </svg>*/}
                {/*                Вернуться назад*/}
                {/*            </button>*/}
                {/*        </Link>*/}
                {/*    </div>*/}
                {/*}*/}
            </div>
        </section>
    )
}
export default Orders;