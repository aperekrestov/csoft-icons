import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import styles from './IconList.module.css'

const IconList = ({ icons }) => {
	return (
		<ul className={styles.list__container}>
			{icons.map(({ id, title, img, status }) => 
				<li className={styles.list__item} key={id}>
					<Link to={`icon-${id}`}>
						<img className={styles.list__image} src={img} alt={title} />
					</Link>
				</li>
			
			)}
		</ul>
	)
}

IconList.propTypes = {
	icons: PropTypes.array
}

export default IconList
