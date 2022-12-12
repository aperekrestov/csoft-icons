import PropTypes from 'prop-types'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useCallback } from 'react'

import cn from 'classnames'
import styles from './Header.module.css'

const Header = ({searchText}) => {
	const [inputSerchValue, setInputSerchValue] = useState(searchText)
	const [searchLink, setSearchLink] = useState("")
	const navigate = useNavigate()
	const navigateToNewSearchPage = useCallback(() => navigate(
		searchLink, 
		{replace: true}), 
		// [navigate],
	)

	const handleInputChange = (event) => {
		setInputSerchValue(event.target.value)
		setSearchLink(`/search=${event.target.value}`)
	}
	
	function handleOnClick(event) {
		navigateToNewSearchPage()
	}
	
	function handleOnKeyUp(event){
		if(event.keyCode === 13 && inputSerchValue !== ""){
			handleOnClick()
		}
	}
	


	return (
		<section className={cn(styles.wrapper, "content_indent")}>
			<nav className={cn(styles.container)}>
				<NavLink to='/' className={styles.logo}></NavLink>

				<div onKeyUp={handleOnKeyUp} className={cn(styles.search)}>
					<input 
						className={styles.search__input} 
						type="text" 
						autoComplete="off" 
						value={inputSerchValue}
						placeholder="Поиск графических иконок" 
						onChange={handleInputChange}
					/>
					<div 
						onClick={handleOnClick} 
						className={styles.search__btn}>
					</div>
				</div>

				<ul className={styles.list__btn}>
					<li><NavLink to='/' className={styles.list__btn_table}></NavLink></li>
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
