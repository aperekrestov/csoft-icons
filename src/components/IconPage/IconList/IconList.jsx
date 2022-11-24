import PropTypes from 'prop-types'

import styles from './IconList.module.css'

const IconList = ({ icons }) => {
	return (
		<ul className={styles.list__container}>
			{icons.map(({ id, title, img, status }) => 
				<li className={styles.list__item} key={id}>
					<a href="#">
						<img className={styles.list__image} src={img} alt={title} />
					</a>
				</li>
			
			)}
		</ul>
	)
}

IconList.propTypes = {
	icons: PropTypes.array
}

export default IconList
