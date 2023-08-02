import { FOLDER, SVG_EXTENSION, GENERAL_SIZE } from '@constants/constants'

export const getIconImageUrl = id => FOLDER + GENERAL_SIZE + "x" + GENERAL_SIZE + "/" + id + SVG_EXTENSION

export const getIconSvgUrl = (id, size) => FOLDER + size + "x" + size + "/" + id + SVG_EXTENSION

export const getIconTags = string => { return string.split(", ") }

export const getIconContent = (iconArray, id) => {
	return iconArray.find(item => item.id === id)
}

export const getIconsJson = async (url) => {
	try {
		const res = await fetch(url)

		if (!res.ok) {
			console.error('Could not fetch. ', res.status)
			return false
		}

		return await res.json()

	} catch (error) {
		console.error('Could not fetch. ', error.message)
		return false
	}
}
