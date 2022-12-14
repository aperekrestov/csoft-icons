import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import styles from './IconsList.module.css'

const IconsList = ({iconArray}) => {

	return (
		<ul className="list__container">

			{iconArray.map(({id, title, img}) =>

				<li className="icon_container" key={id}>
					<Link to={`/icon-${id}`}>
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
