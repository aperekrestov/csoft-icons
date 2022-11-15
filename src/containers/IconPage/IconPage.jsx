import { useState, useEffect } from 'react'
import { getIconResource } from '../../utils/network'
import { ICONS, WAY, EXTENSION, GENERAL_SIZE } from '../../constants/icon'
import IconList from '../../components/IconPage/IconList'

import styles from './IconPage.module.css'

const IconPage = () => {
	const [icons, setIcons] = useState(null)

	const getResource = async (url) => {
		const res = await getIconResource(url)

		const iconList = res.map(({ id, title }) => {
			const img = WAY + GENERAL_SIZE + id + EXTENSION

			return {
				id,
				title, 
				img
			}
		})

		setIcons(iconList)
	}

	useEffect(() => {
		getResource(ICONS)
	}, [])

	return (
		<>
			{icons && <IconList icons = {icons} />}
		</>
	)
}

export default IconPage
