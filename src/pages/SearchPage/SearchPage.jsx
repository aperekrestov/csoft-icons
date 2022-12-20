import { useLocation } from 'react-router'
import { useContext } from 'react'

import IconsList from '@components/IconsPage/IconsList'
import Header from '@components/Header'
import Footer from '@components/Footer'
import GoToTop from '@components/GoToTop'
import { IconArray } from '@context/context'

import styles from './SearchPage.module.css'

const SearchPage = () => {
	const { iconArray, setIconArray } = useContext(IconArray)
	
	const location = useLocation()
	let arrAfterSearch = null
	const searchText = decodeURI(location.pathname.split('/search=').join(''))

	if(iconArray){
		arrAfterSearch = iconArray.filter(function(item){
			return item.tags.toLowerCase().includes(searchText.toLowerCase())
		})
	}
	console.log(arrAfterSearch);
	console.log(searchText);

	window.scrollTo(0, 0)
	console.log('SearchPage')
	return (
		<div className="wrapper">
			<Header searchText={searchText}/>

			<section className={"width_limiter padding_top_bottom_l content_height_auto"}>
				<h3 className={"headline_padding"}>Вы ищите « {searchText} »</h3>
				{arrAfterSearch && (
					<span className="font_ultra headline_padding">Найдено файлов: <b className={"font_ultra"} >{arrAfterSearch.length}</b></span>
				)}
				{arrAfterSearch && <IconsList iconArrayList={arrAfterSearch} />}
			</section>

			<GoToTop />

			<Footer />			
		</div>
	)
}

export default SearchPage
