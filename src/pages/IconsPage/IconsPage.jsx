import { useContext, useEffect } from 'react'
import { useLocation } from "react-router"

import Header from '@components/Header'
import BannerBig from '@components/BannerBig'

import IconsList from '@components/IconsPage/IconsList'
import GoToTop from '@components/GoToTop'
import Footer from '@components/Footer'
import Context from '@context/context'

import cn from 'classnames'
import styles from './IconsPage.module.css'

import { getIconImageUrl } from '@utils/getIconData'
import iconsCollectionData from '@data/csoft-icons-collection.json'



const IconsPage = () => {
	const location = useLocation();
	const { state } = location;
	const value = useContext(Context)

	// const [iconArrayDefault, setIconArrayDefault] = useContext(Context)

	const setResource = () => {
		const iconsApproved = iconsCollectionData.filter(function (item) {
			return item.status === "true"
		})

		const iconsApprovedWithImgUrl = iconsApproved.map(({ id, title, modificated, tags }) => {
			const imgUrl = getIconImageUrl(id)
			return {
				id,
				title,
				modificated,
				imgUrl,
				tags
			}
		})
		// console.log(iconsApprovedWithImgUrl)
		value.iconArrayUpdate(iconsApprovedWithImgUrl)
	}

	function getStateFrom() {
		if(state != null) {
			return state.indexNumber
		}
		return 0
	}

	useEffect(() => {
		if (iconsCollectionData.length > 0) {
			setResource()
		} else {
			// todo определить HOC с выводом данных об ошибке
		}
	}, [])

	return (
		<>
			{value.iconArrayDefault.length > 0
				?
				<div className="wrapper">
					<Header />
					<BannerBig />					
					<section className={"width_limiter padding_top_bottom_l content_height_auto"}>
						<h2 className={cn(styles.icons_page__header, "content_indent")}>Группа компаний CSoft разработала визуальный язык для лучшего пользовательского опыта</h2>
						
						<IconsList iconArrayList={value.iconArrayDefault} stateIconIndex={getStateFrom()}/>
					</section>
					<GoToTop />
					<Footer />
				</div>
				:
				<div className="wrapper">
					<Header />					
					<section className={"width_limiter content_width_middle padding_top_bottom_l content_height_auto"}>
							<h2>Сервис временно недоступен</h2>
							<p>Не удалось загрузить данные с сервера</p>
					</section>
					<GoToTop />
					<Footer />
				</div>
			}
		</>
	)
}

export default IconsPage