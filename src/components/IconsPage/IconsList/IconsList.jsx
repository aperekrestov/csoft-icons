import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import useScrollPosition from '@hoc/useScrollPosition'

import styles from './IconsList.module.css'

const IconsList = ({ icons }) => {
	const scrollPosition = useScrollPosition()
	// console.log(scrollPosition)

	return (
		<ul className={styles.list__container}>
			{icons.map(({ id, title, img, status }) => 
				<li className="icon_container" key={id}>
					<Link to={`icon-${id}`} state={{ scrollPosition: scrollPosition }}>
						<img className="icon_container__image" src={img} alt={title} />
					</Link>
				</li>
			
			)}
		</ul>
	)
}

IconsList.propTypes = {
	icons: PropTypes.array
}

export default IconsList
