import PropTypes from 'prop-types'
import { useState, useContext, useEffect, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { IconArray } from '@context/context'

import cn from 'classnames'
import styles from './Header.module.css'

const Header = ({searchText=''}) => {
	const { iconArray, setIconArray } = useContext(IconArray)
	const [ coincidence, setCoincidence ] = useState()
	const navigate = useNavigate(null)
	const userQuery = useRef(null)
	const coincidenceList = useRef(null)
	let coincidenceTabIndex = -1
	let uniqueTags = []
	let inputValue = ''

	const handleSubmit = (e) => {
		e.preventDefault()
		// todo .../icons?icon=abc$id=123
		goToUserQueryPage()
	}

	const handleFocuseout = (e) => {
		if (!e.currentTarget.contains(e.relatedTarget)) {
			setCoincidence('')
		}
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

	const searchKeyDown = (e) => {
		if(e.keyCode === 40) {
			e.preventDefault()
			coincidenceTabIndex === coincidenceList.current.children.length - 1 ? coincidenceTabIndex = 0 : coincidenceTabIndex ++
			coincidenceList.current.children[coincidenceTabIndex].focus()
			userQuery.current.value = coincidenceList.current.children[coincidenceTabIndex].innerHTML
		}
		if(e.keyCode === 38) {
			e.preventDefault()
			coincidenceTabIndex <= 0 ? coincidenceTabIndex = coincidenceList.current.children.length - 1 : coincidenceTabIndex --
			coincidenceList.current.children[coincidenceTabIndex].focus()
			userQuery.current.value = coincidenceList.current.children[coincidenceTabIndex].innerHTML
		}
		if(e.keyCode === 13) {
			goToUserQueryPage()
		}
	}

	function getOptions() {
		// todo совпадения по первыйм буквам
		// const regex = new RegExp(inputValue, 'gi')
		// let coincidencesFullArray = uniqueTags.filter(item => {	return item.match(regex) })
		const regex = new RegExp('^'+inputValue, 'gi')
		let coincidencesFullArray = uniqueTags.filter(item => {	return item.match(regex) })
		// coincidencesFullArray.sort()
		// console.log(coincidencesFullArray)
		return coincidencesFullArray.slice(0, 5)
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
				<form autoComplete='off' onChange={handleChange} onSubmit={handleSubmit} onBlur={handleFocuseout} className={styles.search}>
					<input 
						type='search' 
						name='search' 
						placeholder="Поиск графических иконок"
						defaultValue={searchText}
						className={cn(styles.search__input)} 
						ref={userQuery}
						onKeyDown={searchKeyDown}
					/>
					<input 
						type='submit' 
						value=""
						className={styles.search__btn}
					/>
					
					{coincidence &&
						<ul ref={coincidenceList} className={styles.search_options}>
							{coincidence.map((item, index) => 
							<li 
								onClick={clickCoincidence} 
								onKeyDown={searchKeyDown}
								key={index}
								tabIndex={index}
							>
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
