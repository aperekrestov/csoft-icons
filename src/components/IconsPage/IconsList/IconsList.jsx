import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { ICONS_PER_PAGE } from '@constants/constants'
// todo завести тип принимаемых данных iconArrayList

const IconsList = ({iconArrayList, stateIconIndex}) => {
	const [iconArrayLazy, setIconArrayLazy] = useState([])
	
	
	const scrollHandler = (e) => {
		let scrollGalleryValue = document.querySelector('.list__container').getBoundingClientRect().y + document.querySelector('.list__container').clientHeight - window.innerHeight
		if (scrollGalleryValue <= 0) {
			loadMore()
		}
		// console.log(document.querySelector('.list__container').getBoundingClientRect().y)
		// console.log("Общяя высота страницы scrollHeight", e.target.documentElement.scrollHeight);
		// console.log("Текущее положение скролла scrollTop", e.target.documentElement.scrollTop);
		// console.log("Высота браузера window.innerHeight", window.innerHeight);
	}
	
	
	function loadMore() {
		console.log('loadMore');
		if(document.querySelector('.list__container').childNodes.length < iconArrayList.length) {
			setIconArrayLazy((iconArrayLazy) => {
				return [...iconArrayLazy, ...iconArrayList.slice(iconArrayLazy.length, iconArrayLazy.length + ICONS_PER_PAGE)]
			})
		} else {
			document.removeEventListener('scroll', scrollHandler)
		}
	}
	
	useEffect(() => {
		// ? добавляем умный список иконок
		let step = Math.trunc(stateIconIndex/ICONS_PER_PAGE) + 1
		setIconArrayLazy([...iconArrayLazy, ...iconArrayList.slice(iconArrayLazy.length, iconArrayLazy.length + ICONS_PER_PAGE * step)])
		console.log(step + ' шаг')
		// ? прокручиваем массив иконок до необходимой
		if(stateIconIndex !== 0){
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
					iconArrayLazy.map(({id, title, imgUrl}) =>
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

export default IconsList
