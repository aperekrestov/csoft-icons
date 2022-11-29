import PropTypes from 'prop-types'

import { useNavigate } from "react-router-dom"
import iconBack from "./img/icon-0181-s.svg"

import cn from "classnames"

import styles from './IconLinkBack.module.css'

const IconLinkBack = ({ scrollPosition }) => {
	const navigate = useNavigate()
	
	const handleGoBack = e => {
		e.preventDefault()
		navigate(-1)
	}

	return (	
		<a 
			href="#" 
			onClick={handleGoBack} 
			className={cn("font_light", styles.btn_back)}
			state={{ scrollPosition: scrollPosition }}
		>
			<img src={iconBack} alt="Назад" className={styles.btn_back__icon} />
			<p>
				Назад
			</p>
		</a>
	)
}

IconLinkBack.propTypes = {
	scrollPosition: PropTypes.number
}

export default IconLinkBack
