import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { withErrorApi } from '@hoc/withErrorApi'

import IconList from '@components/IconPage/IconList'

import { getIconResource } from '@utils/network'

import { ICONS, WAY, EXTENSION, GENERAL_SIZE } from '@constants/icon'

import styles from './IconPage.module.css'

const IconPage = ({ setErrorApi }) => {
	const [icons, setIcons] = useState(null)

	const getResource = async (url) => {
		const res = await getIconResource(url)

		const arrIconFiltered = res.filter(function(item){
			return item.status === "true"
		})

		if (arrIconFiltered) {
			const iconList = arrIconFiltered.map(({ id, title, status }) => {
				let icon_id = id
				let icon_title = title
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
		getResource(ICONS)
	}, [])

	return (
		<div className="container_content">
			<h1>Группа компаний CSoft разработала визуальный язык для лучшего пользовательского опыта</h1>
			{icons && <IconList icons = {icons} />}
		</div>
	)
}

IconPage.prototype = {
	setErrorApi: PropTypes.func
}

export default withErrorApi(IconPage)