import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './IconInfo.module.css'

const IconInfo = ({ iconInfo }) => {
	return (
		<>
			<h3>Файл #{iconInfo[0].data}</h3>
			<span className="font_ultra">обновлен</span>
			<b className={cn(styles.icon_info__date, "font_ultra")} >{iconInfo[2].data}</b>
		</>
	)
}

IconInfo.propTypes = {
	text: PropTypes.array,
}

export default IconInfo
