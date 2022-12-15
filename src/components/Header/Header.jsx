import PropTypes from 'prop-types'
import { useState, useCallback, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { IconArray } from '@services/context'

import cn from 'classnames'
import styles from './Header.module.css'

const Header = ({searchText=''}) => {
	const { iconArray, setIconArray } = useContext(IconArray)

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
		<nav className={cn(styles.container)}>
			<NavLink to='/' className={styles.logo}></NavLink>

			{iconArray
				?
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
				:
				<span className={cn(styles.warning_text, "font_ultra")}>ограниченный режим</span>
			}

			<ul className={styles.list__btn}>
				<li><NavLink to='/' className={styles.list__btn_1}></NavLink></li>
				<li><NavLink to='/legal' className={styles.list__btn_2}></NavLink></li>
				{/* <li><NavLink to='/pdf' className={styles.list__btn_3}></NavLink></li> */}
				<li><a href="icons.pdf" target="_blank" className={styles.list__btn_3}></a></li>
			</ul>
		</nav>
	)
}

Header.propTypes = {
	isSearchHidden: PropTypes.bool,
	searchText: PropTypes.string
}


export default Header
