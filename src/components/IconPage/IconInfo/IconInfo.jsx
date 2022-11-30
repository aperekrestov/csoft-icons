import PropTypes from 'prop-types'
import styles from './IconInfo.module.css'

const IconInfo = ({ iconInfo }) => {
	return (
		<>
			<h3>Файл #{iconInfo[0].data}</h3>
			<span className="font_ultra">обновлен</span>
			<b className={"font_ultra margin_left_small"} >{iconInfo[2].data}</b>
		</>
	)
}

IconInfo.propTypes = {
	text: PropTypes.array,
}

export default IconInfo
