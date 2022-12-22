import PropTypes from 'prop-types'
import { useState, useCallback, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

import { IconArray } from '@context/context'

import cn from 'classnames'
import styles from './Header.module.css'

const Header = ({searchText=''}) => {
	const { iconArray, setIconArray } = useContext(IconArray)
	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()
		const form = e.target;
		const userQuery = form.search.value
		//todo .../icons?icon=abc$id=123
		if (userQuery !== '') {
			navigate('/search=' + userQuery, { state: {query: userQuery} })
		}
	}


	return (
		<nav className={cn(styles.wrapper)}>

			<div className={cn(styles.container, "content_width_large content_indent")}>

			<NavLink to='/' className={styles.logo}></NavLink>

			{iconArray
				?
				<form autoComplete='off' onSubmit={handleSubmit} className={styles.search}>
					<input 
						type='search' 
						name='search' 
						placeholder="Поиск графических иконок"
						defaultValue={searchText}
						className={cn(styles.search__input)} 
					/>
					<input 
						type='submit' 
						value=""
						className={styles.search__btn}
					/>
				</form>
				:
				<span className={"warning_text font_ultra text_center"}>ограниченный режим</span>
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

			</div>
		</nav>
	)
}

Header.propTypes = {
	isSearchHidden: PropTypes.bool,
	searchText: PropTypes.string
}


export default Header
