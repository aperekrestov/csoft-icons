import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { withErrorApi } from '@hoc/withErrorApi'

import IconList from '@components/IconPage/IconList'

import { getIconResource } from '@utils/network'

import { URL, WAY, EXTENSION, GENERAL_SIZE } from '@constants/icon'

import styles from './IconsPage.module.css'

const IconsPage = ({ setErrorApi }) => {
	const [icons, setIcons] = useState(null)

	const getResource = async (url) => {
		const res = await getIconResource(url)

		const arrIconFiltered = res.filter(function(item){
			return item.status === "true"
		})

		if (arrIconFiltered) {
			const iconList = arrIconFiltered.map(({ id, title, status }) => {
				const img = WAY + GENERAL_SIZE + id + EXTENSION				
				return {
					id,
					title, 
					img, 
					status
				}	
			})
			setIcons(iconList)
			setErrorApi(false)
		} else {
			setErrorApi(true)
		}
 
	}

	useEffect(() => {
		getResource(URL)
	}, [])

	return (
		<div className="container_content">
			<h2 className="font_bold" className={styles.iconsPage__header}>Группа компаний CSoft разработала визуальный язык для лучшего пользовательского опыта</h2>
			{icons && <IconList icons = {icons} />}
		</div>
	)
}

IconsPage.prototype = {
	setErrorApi: PropTypes.func
}

export default withErrorApi(IconsPage)