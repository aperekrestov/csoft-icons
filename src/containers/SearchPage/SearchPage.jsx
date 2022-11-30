import PropTypes from 'prop-types'
import { useLocation } from 'react-router'
import cn from "classnames"

import Header from '@components/Header'
import styles from './SearchPage.module.css'

const SearchPage = ({searchText}) => {
	const location = useLocation()
	const serchText = decodeURI(location.pathname.split('/search=').join(''))

	return (
		<>
			<Header searchText={serchText}/>

			<div className={cn("content_width_middle padding_top_bottom_l")}>
				<h3>Вы ищите «{serchText}»</h3>
				<span className="font_ultra">Найдено файлов:</span>
				<b className={"font_ultra margin_left_small"} >43</b>
			</div>
		</>
	)
}

SearchPage.propTypes = {
	searchText: PropTypes.string
}

export default SearchPage
