import { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Context from '@context/context'

const IconsList = ({ iconArrayList }) => {
	const value = useContext(Context)

	const clickHandler = () => {
		let scrollTopValue =  (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop)
		value.updateScrollTop(scrollTopValue)
	}
	window.scrollTo(0, value.scrollTop)

	useEffect(() => {
		//? прокручиваем массив иконок до необходимой
		window.scrollTo(0, value.scrollTop)
	}, [value.scrollTop])


	return (
		<>
			<ul className="list__container">
				{
					iconArrayList.map(({ id, title, imgUrl }) =>
						<li className="icon_container" key={id} onClick={clickHandler}>
							<Link to={`/icon-${id}`} data-title={`id ${id}`}>
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
}


export default IconsList
