import { useLocation } from 'react-router'
import { useContext, useEffect } from 'react'
import IconsList from '@components/IconsPage/IconsList'
import Header from '@components/Header'
import Footer from '@components/Footer'
import IconLinkBack from '@components/IconLinkBack'
import Context from '@context/context'

const SearchPage = () => {
	const location = useLocation()
	const userQuery = decodeURI(location.pathname.split('/search=').join(''))
	const value = useContext(Context)

	let arrAfterSearch = []

	
	if (value.iconsArray.length > 0) {
		//? отображения списка иконок по ТЭГАМ
		arrAfterSearch = value.iconsArray.filter(function (item) {
			return item.tags.toLowerCase().includes(userQuery.toLowerCase())
		})
		
		//? отображения списка иконок по ID
		if (arrAfterSearch.length === 0) {
			arrAfterSearch = value.iconsArray.filter(function (item) {
				return item.id.includes(userQuery)
			})
		}
	}

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

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

			<Footer />
		</div>
	)
}

export default SearchPage
