import { useEffect, useState, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
// import { IconArray } from '@services/context'

// todo вынести в константы
const ICONS_PER_PAGE = 6

const IconsList = ({iconArrayList}) => {
	// const { iconArray, setIconArray } = useContext(IconArray)
	const [iconArrayLazy, setIconArrayLazy] = useState([])
	
	const scrollHandler = (e) => {
		let scrollGalleryValue = document.querySelector('.list__container').getBoundingClientRect().y + document.querySelector('.list__container').clientHeight - window.innerHeight
		if (scrollGalleryValue <= 0) {
			loadMore()
		}
		// console.log(document.querySelector('.list__container').getBoundingClientRect().y);
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
		// ? добавляем первую порцию данных от 0 до ICONS_PER_PAGE
		setIconArrayLazy([...iconArrayLazy, ...iconArrayList.slice(iconArrayLazy.length, iconArrayLazy.length + ICONS_PER_PAGE)])
		
		// todo реализовать постепенную загрузку иконок
		// document.addEventListener('scroll', scrollHandler)
		// return function () {
		// 	document.removeEventListener('scroll', scrollHandler)
		// }
	}, [])

	return (
		<>

			<ul className="list__container">

				{iconArrayList.map(({id, title, img}) =>

					<li className="icon_container" key={id}>
						<Link to={`/icon-${id}`}>
							<img className="icon_container__image" src={img} alt={title} />
						</Link>
					</li>
				)}

			</ul>
		</>
	)
}

export default IconsList
