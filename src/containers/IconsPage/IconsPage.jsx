import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { withErrorApi } from '@hoc/withErrorApi'

import BannerBig from '@components/BannerBig'
import IconsList from '@components/IconsPage/IconsList'

import { getIconResource } from '@utils/network'
import { getIconImage } from '@services/getIconData'

import { JSON } from '@constants/icon'

import styles from './IconsPage.module.css'

const IconsPage = ({ setErrorApi }) => {
	const [icons, setIcons] = useState(null)

	const getResource = async (url) => {
		const res = await getIconResource(url)

		const arrIconFiltered = res.filter(function(item){
			return item.status === "true"
		})

		if (arrIconFiltered) {
			const iconsList = arrIconFiltered.map(({ id, title, status }) => {
				const img = getIconImage(id)
				return {
					id,
					title, 
					img, 
					status
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

	return (
		<div>
			<BannerBig />
			
			<div className="content_width_large padding-h-large">
				<h2 className={styles.iconsPage__header}>Группа компаний CSoft разработала визуальный язык для лучшего пользовательского опыта</h2>
				{icons && <IconsList icons = {icons} />}
			</div>
		</div>
	)
}

IconsPage.prototype = {
	setErrorApi: PropTypes.func
}

export default withErrorApi(IconsPage)