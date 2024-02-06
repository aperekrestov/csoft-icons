import PropTypes from 'prop-types'
import { useState, useRef, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Context from '@context/context'

import cn from 'classnames'
import styles from './Header.module.css'

import logoImg from '@assets/vector-graphics/logo-light.svg'

const Header = ({ searchText = '' }) => {
	const value = useContext(Context)
	const [coincidence, setCoincidence] = useState([])
	const navigate = useNavigate(null)
	const userQuery = useRef(null)
	const coincidenceList = useRef(null)

	let coincidenceTabIndex = -1
	let inputValue = ''

	const handleSubmit = (e) => {
		e.preventDefault()
		// todo .../icons?icon=abc$id=123
		goToUserQueryPage()
	}

	const handleFocuseout = (e) => {
		if (!e.currentTarget.contains(e.relatedTarget)) {
			setCoincidence([])
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
			setCoincidence([])
		}
	}

	const goToUserQueryPage = () => {
		window.scrollTo(0, 0)
		if (userQuery.current.value !== '') {
			setCoincidence([])
			navigate('/search=' + userQuery.current.value, { state: { query: userQuery.current.value } })
		}
	}

	const searchKeyDown = (e) => {
		if (e.keyCode === 40) {
			e.preventDefault()
			coincidenceTabIndex === coincidenceList.current.children.length - 1 ? coincidenceTabIndex = 0 : coincidenceTabIndex++
			coincidenceList.current.children[coincidenceTabIndex].focus()
			userQuery.current.value = coincidenceList.current.children[coincidenceTabIndex].innerHTML
		}
		if (e.keyCode === 38) {
			e.preventDefault()
			coincidenceTabIndex <= 0 ? coincidenceTabIndex = coincidenceList.current.children.length - 1 : coincidenceTabIndex--
			coincidenceList.current.children[coincidenceTabIndex].focus()
			userQuery.current.value = coincidenceList.current.children[coincidenceTabIndex].innerHTML
		}
		if (e.keyCode === 13) {
			goToUserQueryPage()
		}
	}

	function getOptions() {
		let regex = new RegExp('^' + inputValue, 'gi')

		//? задаем список подсказок из массива ТЭГОВ
		let coincidencesFullArray = value.uniqueTags.filter(item => { return item.match(regex) })

		//? задаем списко подсказок из ID значений, если по ТЭГАМ нет совпадений
		if (coincidencesFullArray.length === 0) {
			coincidencesFullArray = value.listID.filter(item => { return item.match(regex) })
		}

		return coincidencesFullArray.slice(0, 5)
	}

	return (
		<nav className={cn(styles.wrapper)}>

			<div className={cn(styles.container, "content_width_large content_indent")}>

				{/* <NavLink to='/' className={styles.logo}></NavLink> */}
				<div className={styles.logo_container}>
					<NavLink to='/'>
						<img src={logoImg} alt="логотип" />
					</NavLink>
				</div>

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

					{coincidence && coincidence.length !== 0 &&
						<ul
							ref={coincidenceList}
							className={styles.search_options}
						>
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

				<ul className={styles.list__btn}>
					<li>
						<NavLink to='/' className={styles.list__btn_1} data-title="ГЛАВНАЯ"></NavLink>
					</li>
					<li>
						<NavLink to='/instruction' className={styles.list__btn_2} data-title="ИНСТРУКЦИИ"></NavLink>
					</li>
					<li>
						<NavLink to="/legal" className={styles.list__btn_3} data-title="СОГЛАШЕНИЕ"></NavLink>
					</li>
					<li>
						<a href="csoft-icons-collection.pdf" target="_blank" className={styles.list__btn_4} data-title="ЗАГРУЗИТЬ PDF"></a>
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
