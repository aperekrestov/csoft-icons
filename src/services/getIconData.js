import { FOLDER, EXTENSION, GENERAL_SIZE } from '@constants/constants'

export const getIconImage = id => FOLDER + GENERAL_SIZE + "x" + GENERAL_SIZE + "/" + id + EXTENSION

export const getIconSvgUrl = (id, size) => FOLDER + size + "x" + size + "/" + id + EXTENSION

export const getIconTags = string => { return string.split(", ") }

export const getIconContent = (iconArray, id) => {
	for (let index = 0; index < iconArray.length; index++) {
		if(iconArray[index].id === id){
			return iconArray[index]
		}			
	}
}
// export const getIconInformation = () => {
// 	for (let index = 0; index < iconArray.length; index++) {
// 		if(iconArray[index].id === clickedIdIcon){
// 			iconTitle = iconArray[index].title
// 			iconImage = getIconImage(clickedIdIcon)
// 			iconTags = getIconTags(iconArray[index].tags)
// 			iconInfo = ([
// 				{ title: 'Id', data: iconArray[index].id },
// 				{ title: 'Title', data: iconArray[index].title },
// 				{ title: 'Modificated', data: iconArray[index].modificated },
// 			])
// 		}			
// 	}
// }
