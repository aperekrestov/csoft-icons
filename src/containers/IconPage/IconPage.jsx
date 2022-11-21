import { useState, useEffect } from 'react'

import { withErrorApi } from '@hoc/withErrorApi'
import { getIconResource } from '@utils/network'
import { ICONS, WAY, EXTENSION, GENERAL_SIZE } from '@constants/icon'
import IconList from '@components/IconPage/IconList'

import styles from './IconPage.module.css'

const IconPage = ({ setErrorApi }) => {
	const [icons, setIcons] = useState(null)

	const getResource = async (url) => {
		const res = await getIconResource(url)

		if (res) {
			const iconList = res.map(({ id, title }) => {
				const img = WAY + GENERAL_SIZE + id + EXTENSION
	
				return {
					id,
					title, 
					img
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
		<>
			<h1>Навигация</h1>
			{icons && <IconList icons = {icons} />}
		</>
	)
}

export default withErrorApi(IconPage)
