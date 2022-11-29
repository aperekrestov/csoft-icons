import PropTypes from 'prop-types'

import { NavLink } from 'react-router-dom'
import { useState } from 'react'

import cn from 'classnames'

import { withErrorApi } from '@hoc/withErrorApi'
import { getIconResource } from '@utils/network'
import { PARAM_SERCH } from '@constants/constants'

import styles from './Header.module.css'

const Header = ({setErrorApi}) => {
	const [inputSerchValue, setInputSerchValue] = useState('')

	// const getResponse = async param => {
	// 	const res = await getIconResource(JSON)
		
	// 	if (res) {
	// 		console.log(res);
	// 		setErrorApi(false)
	// 	} else {
	// 		setErrorApi(true)
	// 	}

	// }

	const handleInputChange = (event) => {
		// console.log(event.target.value)
		const value = event.target.value
		setInputSerchValue(value)
		// getResponse(value)
	}

	return (
		<section className={styles.wrapper}>
			<nav className={cn(styles.container, "content_width_large")}>
				<NavLink to='/' className={styles.logo}></NavLink>

				<div className={cn(styles.search, "content_width_middle")}>
					<input 
						className={styles.search__input} 
						type="text" 
						autoComplete="off" 
						value={inputSerchValue}
						placeholder="Поиск графических иконок" 
						onChange={handleInputChange}
					/>
					<div className={styles.search__btn}></div>
				</div>

				<ul className={styles.list__btn}>
					<li><NavLink to='/legal' className={styles.list__btn_legal}></NavLink></li>
					<li><NavLink to='/' className={styles.list__btn_home}></NavLink></li>
				</ul>
			</nav>
		</section>
	)
}

Header.prototype = {
	setErrorApi: PropTypes.function
}

export default withErrorApi(Header)
