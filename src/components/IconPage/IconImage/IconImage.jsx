import PropTypes from 'prop-types'
import styles from './IconImage.module.css'

const IconImage = ({ iconImage, iconTitle }) => {
	return (
		<>
			<div className="icon_container">
				<img className="icon_container__image" src={iconImage} alt={iconTitle} />
			</div>
		</>
	)
}

IconImage.propTypes = {
	iconImage: PropTypes.string,
	iconTitle: PropTypes.string,
}

export default IconImage
