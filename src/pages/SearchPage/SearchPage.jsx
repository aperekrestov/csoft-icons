import { useLocation } from 'react-router'
import { useContext, useState } from 'react'
import IconsList from '@components/IconsPage/IconsList'
import Header from '@components/Header'
import Footer from '@components/Footer'
import GoToTop from '@components/GoToTop'
import IconLinkBack from '@components/IconLinkBack'
import Context from '@context/context'

const SearchPage = () => {
	const location = useLocation()
	const userQuery = decodeURI(location.pathname.split('/search=').join(''))
	const value = useContext(Context)

	let arrAfterSearch = null

	if(value.iconArrayDefault.length > 0){
		arrAfterSearch = value.iconArrayDefault.filter(function(item){
			return item.tags.toLowerCase().includes(userQuery.toLowerCase())
		})
	}

	window.scrollTo(0, 0)

	return (
		<div className="wrapper">
			<Header searchText={userQuery} />

			<section className={"width_limiter padding_top_bottom_l content_height_auto"}>

				<div className="content_indent">
					<div className="margin_bottom_xl">
						<IconLinkBack />
					</div>
					<h3>По вашему запросу</h3>
					{arrAfterSearch && (
						<span className="font_ultra">Найдено файлов: <b className={"font_ultra"} >{arrAfterSearch.length}</b></span>
					)}
				</div>

				{arrAfterSearch && <IconsList iconArrayList={arrAfterSearch} />}
			</section>

			<GoToTop />
			<Footer />
		</div>
	)
}

export default SearchPage
