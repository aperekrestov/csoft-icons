import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { useState, createContext, useContext, useEffect } from 'react'

import { getIconResource } from '@utils/network'
import { getIconImage } from '@services/getIconData'
import { IconArray } from '@services/context'
import { JSON } from '@constants/constants'

import cn from 'classnames'
import styles from './Header.module.css'

const Header = ({searchText}) => {
	const { iconArray, setIconArray } = useContext(IconArray)
	// console.log(iconArray);

	const getResource = async (url) => {
		const res = await getIconResource(url)
		const arrIconFiltered = res.filter(function(item){
			return item.status === "true"
		})
		if (arrIconFiltered) {
			const iconsList = arrIconFiltered.map(({ id, title, status, tags }) => {
				const img = getIconImage(id)
				return {
					id,
					title, 
					img, 
					status, 
					tags
				}	
			})
			setIconArray(iconsList)
			// setIcons(iconsList)
			// setErrorApi(false)
		} else {
			// setErrorApi(true)
			console.error("Ошибка в загрузке массива иконок")
		}
 
	}
	useEffect(() => {
		getResource(JSON)
	}, [])

	const [inputSerchValue, setInputSerchValue] = useState(searchText)

	const handleInputChange = (event) => {
		// console.log(event.target.value)
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
