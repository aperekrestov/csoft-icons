import PropTypes from 'prop-types'

import cn from 'classnames'

import styles from './TheIcon.module.css'

const TheIcon = ({ iconImage, iconTitle }) => {
	return (
		<>
			<br/>
			<img className={cn("icon_container__image", "padding_top_bottom_m")} src={iconImage} alt={iconTitle} />
		</>
	)
}

TheIcon.propTypes = {
	iconImage: PropTypes.string,
	iconTitle: PropTypes.string
}

export default TheIcon
