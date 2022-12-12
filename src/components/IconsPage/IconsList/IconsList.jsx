import { useContext } from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import useScrollPosition from '@hoc/useScrollPosition'
import { ScrollTop } from '@services/context'
import styles from './IconsList.module.css'

const IconsList = ({iconArray}) => {
	const scrollPosition = useScrollPosition()
	const {scrollTop, setScrollTop } = useContext(ScrollTop)

	function click(e) {
		setScrollTop(scrollPosition)
	}

	return (
		<ul className="list__container">

			{iconArray.map(({id, title, img}) =>

				<li className="icon_container" key={id}>
					<Link to={`/icon-${id}`} onClick={click}>
						<img className="icon_container__image" src={img} alt={title} />
					</Link>
				</li>
				
			)}
		</ul>
	)
}

IconsList.propTypes = {
	iconArray: PropTypes.array
}

export default IconsList
