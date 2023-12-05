import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Context from '@context/context'

import { ICONS_PER_PAGE } from '@constants/constants'

const IconsList = ({ iconArrayList, stateIconIndex }) => {
	//? console.log(iconArrayList.length + ' количесвто иконок')
	// const [iconArrayLazy, setIconArrayLazy] = useState([])
	// const value = useContext(Context)
	// let iconArrayLazyHasLoaded = []

	// const scrollHandler = (e) => {
	// 	let scrollGalleryValue = document.querySelector('.list__container').getBoundingClientRect().y + document.querySelector('.list__container').clientHeight - window.innerHeight
	// 	if (scrollGalleryValue <= 0) {
	// 		loadMore()
	// 	} 
		
	// 	// if (iconArrayLazyHasLoaded.length === iconArrayList.length) {
	// 	// 	value.loaderUpdate(iconArrayList.length)
	// 	// }
	// 	// todo процент отображаемых иконок
	// 	//? console.log(iconArrayList.length + ' - 100%')
	// 	//? console.log(document.querySelector('.list__container').getBoundingClientRect().y)
	// 	//? console.log("Общяя высота страницы scrollHeight", e.target.documentElement.scrollHeight);
	// 	//? console.log("Текущее положение скролла scrollTop", e.target.documentElement.scrollTop); 
	// 	//! текущее положение скролла лучше брать у pageYOffset
	// 	//? console.log("Высота браузера window.innerHeight", window.innerHeight);
	// }


	// function loadMore() {
	// 	if (document.querySelector('.list__container').childNodes.length < iconArrayList.length) {
	// 		setIconArrayLazy((iconArrayLazy) => {
	// 			iconArrayLazyHasLoaded = [...iconArrayLazy, ...iconArrayList.slice(iconArrayLazy.length, iconArrayLazy.length + ICONS_PER_PAGE)]
	// 			setTimeout(() => value.loaderUpdate(iconArrayLazyHasLoaded.length), 0)
	// 			return iconArrayLazyHasLoaded
	// 		})
	// 	} 
	// 	//? не снимаем слушатель события, чтобы продолжал работать виджет загрузки
	// 	// 	document.removeEventListener('scroll', scrollHandler)
	// }

	useEffect(() => {
		// todo сместить скроллинг до сохраненной координаты 
		//? прокручиваем массив иконок до необходимой
		// if (stateIconIndex === 0 || typeof stateIconIndex == 'undefined') {
		// 	iconArrayLazyHasLoaded = [...iconArrayLazy, ...iconArrayList.slice(iconArrayLazy.length, iconArrayLazy.length + ICONS_PER_PAGE)]
		// 	setIconArrayLazy(iconArrayLazyHasLoaded)
		// } else {
		// 	iconArrayLazyHasLoaded = [...iconArrayLazy, ...iconArrayList.slice(iconArrayLazy.length, iconArrayLazy.length + stateIconIndex)]
		// 	setIconArrayLazy(iconArrayLazyHasLoaded)
		// 	setTimeout(() => window.scrollTo(0, document.querySelector('.list__container').clientHeight), 10)
		// }
		// value.loaderUpdate(iconArrayLazyHasLoaded.length)
		// document.addEventListener('scroll', scrollHandler)

		// return function () {
		// 	document.removeEventListener('scroll', scrollHandler)
		// }
	}, [])


	return (
		<>

			<ul className="list__container">
				{
					iconArrayList.map(({ id, title, imgUrl }) =>
						<li className="icon_container" key={id}>
							<Link to={`/icon-${id}`}>
								<img className="icon_container__image" src={imgUrl} alt={title} />
							</Link>
						</li>
					)
				}
			</ul>
		</>
	)
}


IconsList.propTypes = {
	iconArrayList: PropTypes.array,
	stateIconIndex: PropTypes.number
}


export default IconsList
