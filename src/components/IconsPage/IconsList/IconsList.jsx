import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { IconArray } from '@services/context'

const ICONS_PER_PAGE = 5

const IconsList = () => {
	const { iconArray, setIconArray } = useContext(IconArray)

	const [fetching, setFetching] = useState(false)
	const [iconArrayLazy, setIconArrayLazy] = useState([])

 	const scrollHandler = (e) => {
		let scrollGalleryValue = document.querySelector('.list__container').getBoundingClientRect().y + document.querySelector('.list__container').clientHeight - window.innerHeight
		if (scrollGalleryValue <= 0 ) {
			setFetching(!fetching)
		}
		// console.log(document.querySelector('.list__container').getBoundingClientRect().y);
		// console.log("Общяя высота страницы scrollHeight", e.target.documentElement.scrollHeight);
		// console.log("Текущее положение скролла scrollTop", e.target.documentElement.scrollTop);
		// console.log("Высота браузера window.innerHeight", window.innerHeight);
	}

	useEffect(() => {
		if(fetching){
			setIconArrayLazy(iconArrayLazy => [...iconArrayLazy, ...iconArray.slice(iconArrayLazy.length, iconArrayLazy.length+ICONS_PER_PAGE)])
		}
	}, [fetching])

	useEffect(() => {
		setIconArrayLazy(iconArrayLazy => [...iconArrayLazy, ...iconArray.slice(iconArrayLazy.length, iconArrayLazy.length + ICONS_PER_PAGE)])
		document.addEventListener('scroll', scrollHandler)
		return function () {
			document.removeEventListener('scroll', scrollHandler)
		}
	}, [])

	return (
		<>
		{iconArrayLazy &&
			<ul className="list__container">

				{iconArrayLazy.map(({id, title, img}) =>

					<li className="icon_container" key={id}>
						<Link to={`/icon-${id}`}>
							<img className="icon_container__image" src={img} alt={title} />
						</Link>
					</li>
				)}
			</ul>
		}
		</>
	)
}

export default IconsList
