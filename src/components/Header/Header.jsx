import PropTypes from 'prop-types'
import { useState, useCallback, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

import { IconArray } from '@context/context'

import cn from 'classnames'
import styles from './Header.module.css'

const Header = ({searchText=''}) => {
	const { iconArray, setIconArray } = useContext(IconArray)
	
	const [inputSerchValue, setInputSerchValue] = useState(searchText)
	const [searchLink, setSearchLink] = useState("")
	const navigate = useNavigate()	
	const handleInputChange = (event) => {
		setInputSerchValue(event.target.value)
		setSearchLink(`/search/${event.target.value}`)
	}
	function handleOnClick(event) {
		navigateToNewSearchPage()
	}
	function handleOnKeyUp(event){
		if(event.keyCode === 13 && inputSerchValue !== ""){
			navigateToNewSearchPage()
		}
	}
	const navigateToNewSearchPage = useCallback(() => navigate(searchLink))



	
	const [searchParams, setSearchParams] = useSearchParams()
	const iconQuery = searchParams.get('icons?icon') || ''
	const handleSubmit = (e) => {
		e.preventDefault()
		const form = e.target;
		const query = form.search.value
		setSearchParams({ icon: query })
		// newNavigate({
		// 	// todo добавлять к корневому уровну pathname
		// 	pathname: "icons",
		// 	search: "?icon=" + query
		// })
	}


	return (
		<nav className={cn(styles.container, "content_indent")}>
			<NavLink to='/' className={styles.logo}></NavLink>

			{iconArray
				?
					<form autoComplete='off' onSubmit={handleSubmit}>
						<input type='search' name='search' className={cn(styles.search)} />
						<input type='submit' name='поиск' />
					</form>
				// <div onKeyUp={handleOnKeyUp} className={cn(styles.search)}>
				// 	<input 
				// 		className={styles.search__input} 
				// 		type="search" 
				// 		autoComplete="off" 
				// 		value={inputSerchValue}
				// 		placeholder="Поиск графических иконок" 
				// 		onChange={handleInputChange}
				// 		/>
				// 	<div 
				// 		onClick={handleOnClick} 
				// 		className={styles.search__btn}>
				// 	</div>
				// </div>
				:
				<span className={cn(styles.warning_text, "font_ultra")}>ограниченный режим</span>
			}

			<ul className={styles.list__btn}>
				<li>
					<NavLink to='/' className={styles.list__btn_1}></NavLink>
				</li>
				<li>
					<NavLink to='/legal' className={styles.list__btn_2}></NavLink>
				</li>
				<li>
					<a href="csoft-icons-collection.pdf" target="_blank" className={styles.list__btn_3}></a>
				</li>
			</ul>
		</nav>
	)
}

Header.propTypes = {
	isSearchHidden: PropTypes.bool,
	searchText: PropTypes.string
}


export default Header
