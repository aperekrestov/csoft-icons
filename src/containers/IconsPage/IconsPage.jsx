import { useContext } from 'react'

import Header from '@components/Header'
import BannerBig from '@components/BannerBig'
import IconsList from '@components/IconsPage/IconsList'
import Footer from '@components/Footer'
import { IconArray } from '@services/context'

import styles from './IconsPage.module.css'



const IconsPage = () => {
	const { iconArray, setIconArray } = useContext(IconArray)

	console.log('IconsPage')
	return (
		<>
			{iconArray
				?
				<div className="wrapper">
					<Header />
					<BannerBig />					
					<section className={"wrapper padding_top_bottom_l content_height_auto"}>
						<h2 className={styles.icons_page__header}>Группа компаний CSoft разработала визуальный язык для лучшего пользовательского опыта</h2>
						<IconsList />	
					</section>
					<Footer />
				</div>
				:
				<div className="wrapper">
					<Header />					
					<section className={"content_width_middle padding_top_bottom_l content_height_auto"}>
							<h2>Сервис временно недоступен</h2>
							<p>Не удалось загрузить данные с сервера</p>
					</section>
					<Footer />
				</div>
			}
		</>
	)
}

export default IconsPage