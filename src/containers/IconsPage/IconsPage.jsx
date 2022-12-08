import { useContext } from 'react'

import Header from '@components/Header'
import BannerBig from '@components/BannerBig'
import IconsList from '@components/IconsPage/IconsList'
import { IconArray } from '@services/context'
import { ScrollTop } from '@services/context'
import { TIMEOUT_SCROLL } from '@constants/constants'

import styles from './IconsPage.module.css'



const IconsPage = () => {
	const { scrollTop, setScrollTop } = useContext(ScrollTop)
	const { iconArray, setIconArray } = useContext(IconArray)
	
	function targetScroll() {
		window.scrollTo(0, scrollTop)
	}

	return (
		<div>
			<Header searchText={""}/>
			<BannerBig />
			
			<section className={"content_width_large padding_top_bottom_l"}>
				<h2 className={styles.icons_page__header}>Группа компаний CSoft разработала визуальный язык для лучшего пользовательского опыта</h2>
				{iconArray && <IconsList iconArray={iconArray} />}
				
			</section>

			{setTimeout(targetScroll, TIMEOUT_SCROLL)}
		</div>
	)
}

export default IconsPage