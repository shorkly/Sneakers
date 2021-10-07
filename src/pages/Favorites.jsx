function Favorites(){
    return(
            <section>
                <div className='container'>
                    <img src={'img/emoji.png'} alt='' />
                    <h3>Закладок нет :(</h3>
                    <p>Вы ничего не добавляли в закладки</p>
                    <button className="buttn">
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 7H14.7143" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Вернуться назад
                    </button>
                </div>
            </section>
    )
}
export default Favorites;