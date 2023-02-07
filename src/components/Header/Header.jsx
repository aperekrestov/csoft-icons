import PropTypes from 'prop-types'
import { useState, useContext, useEffect, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { IconArray } from '@context/context'

import cn from 'classnames'
import styles from './Header.module.css'

const Header = ({searchText=''}) => {
	const { iconArray, setIconArray } = useContext(IconArray)
	const [ coincidence, setCoincidence ] = useState()
	const navigate = useNavigate()
	const userQuery  = useRef()
	let uniqueTags = []
	let inputValue = ''

	const handleSubmit = (e) => {
		e.preventDefault()
		// todo .../icons?icon=abc$id=123
		goToUserQueryPage()
	}

	const clickCoincidence = (e) => {
		userQuery.current.value = e.target.textContent
		goToUserQueryPage()
	}

	const handleChange = (e) => {
		inputValue = e.target.value
		setCoincidence(getOptions)
		if (inputValue === '') {
			setCoincidence('')
		}
	}

	const goToUserQueryPage = () => {
		if (userQuery.current.value !== '') {
			setCoincidence('')
			navigate('/search=' + userQuery.current.value, { state: {query: userQuery.current.value} })
		}
	}

	function getOptions() {
		const regex = new RegExp(inputValue, 'gi')
		return uniqueTags.filter(item => {
			return item.match(regex)
		})
	}

	useEffect(()=>{
		if(iconArray) {
			const iconArrayTags = iconArray.map(item => item.tags.toLowerCase())
			const iconArrayTagsJoin = iconArrayTags.join(', ')
			const iconArrayTagsSplit = iconArrayTagsJoin.split(', ')
			const uniqueTagsSet = new Set(iconArrayTagsSplit)
			uniqueTags = [...uniqueTagsSet]
		}
	}, [iconArray, uniqueTags])


	return (
		<nav className={cn(styles.wrapper)}>

			<div className={cn(styles.container, "content_width_large content_indent")}>

			<NavLink to='/' className={styles.logo}></NavLink>

			{iconArray
				?
				<form autoComplete='off' onChange={handleChange} onSubmit={handleSubmit} className={styles.search}>
					<input 
						type='search' 
						name='search' 
						placeholder="Поиск графических иконок"
						defaultValue={searchText}
						className={cn(styles.search__input)} 
						ref={userQuery}
					/>
					<input 
						type='submit' 
						value=""
						className={styles.search__btn}
					/>
					
					{coincidence &&
						<ul className={styles.search_options}>
							{coincidence.map((item) => 
							<li onClick={clickCoincidence} key={item}>
								{item}
							</li>
							)}
						</ul>
					}

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
