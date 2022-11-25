import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import styles from './IconsList.module.css'

const IconsList = ({ icons }) => {
	return (
		<ul className={styles.list__container}>
			{icons.map(({ id, title, img, status }) => 
				<li className="icon_container" key={id}>
					<Link to={`icon-${id}`}>
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
