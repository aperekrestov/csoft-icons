import { FOLDER, EXTENSION, GENERAL_SIZE } from '@constants/constants'

export const getIconImage = id => FOLDER + GENERAL_SIZE + id + EXTENSION

export const getIconTags = string => {
	return string.split(", ")
}