import { useContext } from 'react'
import { useLocation } from "react-router"

import Header from '@components/Header'
import BannerBig from '@components/BannerBig'

import IconsList from '@components/IconsPage/IconsList'
import GoToTop from '@components/GoToTop'
import Footer from '@components/Footer'
import Context from '@context/Context'

import cn from 'classnames'
import styles from './IconsPage.module.css'



const IconsPage = () => {
	const location = useLocation();
	const { state } = location;
	const value = useContext(Context)

	function getStateFrom() {
		if(state != null) {
			return state.indexNumber
		}
		return 0
	}

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