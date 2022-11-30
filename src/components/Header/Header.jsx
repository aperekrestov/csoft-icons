import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import cn from 'classnames'
import styles from './Header.module.css'

const Header = ({searchText}) => {
	const [inputSerchValue, setInputSerchValue] = useState(searchText)

	const handleInputChange = (event) => {
		console.log(event.target.value)
		setInputSerchValue(event.target.value)
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
					<NavLink to={`/search=${inputSerchValue}`} className={styles.search__btn}></NavLink>
				</div>

				<ul className={styles.list__btn}>
					<li><NavLink to='/legal' className={styles.list__btn_legal}></NavLink></li>
					<li><NavLink to='/' className={styles.list__btn_home}></NavLink></li>
				</ul>
			</nav>
		</section>
	)
}

Header.propTypes = {
	searchText: PropTypes.string
}


export default Header
