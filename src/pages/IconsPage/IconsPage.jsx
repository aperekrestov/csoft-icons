import { useEffect, useContext } from 'react'
import { useLocation } from "react-router"

import Header from '@components/Header'
import BannerBig from '@components/BannerBig'

import IconsList from '@components/IconsPage/IconsList'
import GoToTop from '@components/GoToTop'
import Footer from '@components/Footer'
import { IconArray } from '@context/context'

import cn from 'classnames'
import styles from './IconsPage.module.css'



const IconsPage = () => {
	const { iconArray, setIconArray } = useContext(IconArray)

	const location = useLocation();
	const { state } = location;
	// console.log(location.state)

	function getStateFrom() {
		if(state != null) {
			return state.indexNumber
		}
		return 0
	}

	useEffect(() => {
		// todo прокрутку до корректной иконки
		// window.scrollTo(0, 550)
		// console.log(document.querySelector('.list__container').getBoundingClientRect().y + ' докручиваем')
		// document.querySelector('.list__container').getBoundingClientRect().y
	}, [])

	console.log('IconsPage')
	return (
		<>
			{iconArray
				?
				<div className="wrapper">
					<Header />
					<BannerBig />					
					<section className={"width_limiter padding_top_bottom_l content_height_auto"}>
						<h2 className={cn(styles.icons_page__header, "content_indent")}>Группа компаний CSoft разработала визуальный язык для лучшего пользовательского опыта</h2>
						<IconsList iconArrayList={iconArray} stateIconIndex={getStateFrom()}/>	
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