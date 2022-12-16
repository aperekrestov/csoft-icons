import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import styles from './LazyImage.module.css'

const LazyImage = ({id, img, title}) => {
	return (
		<>
			<Link to={`/icon-${id}`}>
				<img className="icon_container__image" src={img} alt={title} />
			</Link>
		</>
	)
}

LazyImage.propTypes = {
	id: PropTypes.string,
	img: PropTypes.string,
	title: PropTypes.string
}

export default LazyImage
