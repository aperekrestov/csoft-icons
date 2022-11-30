import PropTypes from 'prop-types'
import { useState, useEffect, useContext } from 'react'

import { withErrorApi } from '@hoc/withErrorApi'
import Header from '@components/Header'
import BannerBig from '@components/BannerBig'
import IconsList from '@components/IconsPage/IconsList'
import { getIconResource } from '@utils/network'
import { getIconImage } from '@services/getIconData'
import ScrollTop from '@services/context'
import { JSON, TIMEOUT_SCROLL } from '@constants/constants'

import styles from './IconsPage.module.css'



const IconsPage = ({ setErrorApi }) => {
	const {scrollTop, setScrollTop } = useContext(ScrollTop)
	const [icons, setIcons] = useState(null)

	const getResource = async (url) => {
		const res = await getIconResource(url)

		const arrIconFiltered = res.filter(function(item){
			return item.status === "true"
		})

		if (arrIconFiltered) {
			const iconsList = arrIconFiltered.map(({ id, title, status, tags }) => {
				const img = getIconImage(id)
				return {
					id,
					title, 
					img, 
					status, 
					tags
				}	
			})
			setIcons(iconsList)
			setErrorApi(false)
		} else {
			setErrorApi(true)
		}
 
	}

	useEffect(() => {
		getResource(JSON)
	}, [])

	function targetScroll() {
		// console.log(scrollTop + " проверка")
		window.scrollTo(0, scrollTop)
	}

	return (
		<div>
			<Header searchText={""}/>
			<BannerBig />
			
			<section className={"content_width_large padding_top_bottom_l"}>
				<h2 className={styles.icons_page__header}>Группа компаний CSoft разработала визуальный язык для лучшего пользовательского опыта</h2>
				{icons && <IconsList icons = {icons} />}
			</section>

			{setTimeout(targetScroll, TIMEOUT_SCROLL)}
		</div>
	)
}

IconsPage.prototype = {
	setErrorApi: PropTypes.func
}

export default withErrorApi(IconsPage)