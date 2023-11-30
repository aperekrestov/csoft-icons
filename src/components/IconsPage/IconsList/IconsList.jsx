import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Context from '@context/context'

import { ICONS_PER_PAGE } from '@constants/constants'

const IconsList = ({ iconArrayList, stateIconIndex }) => {
	const [iconArrayLazy, setIconArrayLazy] = useState([])
	const value = useContext(Context)
	// const {
	// 	iconArrayDefault,
	// 	loader,
	// 	loaderUpdate
	// } = useContext(Context)


	// console.log(value.iconArrayDefault)

	const scrollHandler = (e) => {
		let scrollGalleryValue = document.querySelector('.list__container').getBoundingClientRect().y + document.querySelector('.list__container').clientHeight - window.innerHeight
		if (scrollGalleryValue <= 0) {
			loadMore()
		}
		// todo процент отображаемых иконок
		//? console.log(iconArrayList.length + ' - 100%')
		//? console.log(document.querySelector('.list__container').getBoundingClientRect().y)
		//? console.log("Общяя высота страницы scrollHeight", e.target.documentElement.scrollHeight);
		//? console.log("Текущее положение скролла scrollTop", e.target.documentElement.scrollTop);
		//? console.log("Высота браузера window.innerHeight", window.innerHeight);
	}


	function loadMore() {
		// console.log('loader ' + value.loader)
		if (document.querySelector('.list__container').childNodes.length < iconArrayList.length) {
			setIconArrayLazy((iconArrayLazy) => {
				return [...iconArrayLazy, ...iconArrayList.slice(iconArrayLazy.length, iconArrayLazy.length + ICONS_PER_PAGE)]
			})
			value.loaderUpdate(ICONS_PER_PAGE)
			// loaderUpdate(ICONS_PER_PAGE)
			// console.log('обновляем значение через loadedValue')
		} else {
			document.removeEventListener('scroll', scrollHandler)
		}
	}

	useEffect(() => {
		//? прокручиваем массив иконок до необходимой
		if (stateIconIndex === 0 || typeof stateIconIndex == 'undefined') {
			value.loaderUpdate(ICONS_PER_PAGE)
			// loaderUpdate(ICONS_PER_PAGE)
			setIconArrayLazy([...iconArrayLazy, ...iconArrayList.slice(iconArrayLazy.length, iconArrayLazy.length + ICONS_PER_PAGE)])
		} else {
			setIconArrayLazy([...iconArrayLazy, ...iconArrayList.slice(iconArrayLazy.length, iconArrayLazy.length + stateIconIndex)])
			setTimeout(() => window.scrollTo(0, document.querySelector('.list__container').clientHeight), 10)
		}

		document.addEventListener('scroll', scrollHandler)

		return function () {
			document.removeEventListener('scroll', scrollHandler)
		}
	}, [])


	return (
		<>

			<ul className="list__container">
				{
					iconArrayLazy.map(({ id, title, imgUrl }) =>
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
