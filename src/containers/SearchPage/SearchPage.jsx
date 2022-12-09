import { useLocation } from 'react-router'
import { useContext } from 'react'

import IconsList from '@components/IconsPage/IconsList'
import Header from '@components/Header'
import { IconArray } from '@services/context'

import styles from './SearchPage.module.css'

const SearchPage = () => {
	const { iconArray, setIconArray } = useContext(IconArray)
	let arrAfterSearch = null

	const location = useLocation()
	const searchText = decodeURI(location.pathname.split('/search=').join(''))

	if(iconArray){
		arrAfterSearch = iconArray.filter(function(item){
			return item.tags.toLowerCase().includes(searchText.toLowerCase())
		})
	}

	console.log('SearchPage')
	return (
		<>
			<Header searchText={searchText}/>

			<div className={"content_width_large padding_top_bottom_l"}>
				<h3>Вы ищите « {searchText} »</h3>
				<span className="font_ultra">Найдено файлов:</span>

				{arrAfterSearch && <b className={"font_ultra margin_left_ultra_small"} >{arrAfterSearch.length}</b>}

				<div className={"padding_top_bottom_l"}>
					{arrAfterSearch && <IconsList iconArray={arrAfterSearch} />}
				</div>
			</div>
		</>
	)
}

export default SearchPage
