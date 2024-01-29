import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import IconsPage from '@pages/IconsPage'
import IconPage from '@pages/IconPage'
import LegalPage from '@pages/LegalPage'
import InstructionPage from '@pages/InstructionPage'
import SearchPage from '@pages/SearchPage'
import NotFoundPage from '@pages/NotFoundPage'

import Context from '@context/context'

import { getIconImageUrl } from '@utils/getIconData'
import iconsCollectionData from '@data/csoft-icons-collection.json'

const App = () => {
	const [ iconsArray, setIconArray ] = useState([])
	const [ uniqueTags, setUniqueTags ] = useState([])
	const [ listID, setListID ] = useState([])
	const [ scrollTop, setScrollTop ] = useState(0)

	const updateScrollTop = (n) => {
		setScrollTop(n)
	}

	const value = {
		iconsArray,
		uniqueTags,
		listID,
		scrollTop, 
		updateScrollTop
	}

	const setResource = () => {
		//? определяем рабочий массив данных коллекции иконок
		const iconsApproved = iconsCollectionData.filter(function (item) {
			return item.status === "true"
		})
		const iconsApprovedWithImgUrl = iconsApproved.map(({ id, title, tags }) => {
			const imgUrl = getIconImageUrl(id)
			return {
				id,
				title,
				imgUrl,
				tags
			}
		})
		setIconArray(iconsApprovedWithImgUrl)

		//? определяем массив уникальных тегов для подсказки в поисковой строке
		const iconArrayTags = iconsApprovedWithImgUrl.map(item => item.tags.toLowerCase())
		const iconArrayTagsJoin = iconArrayTags.join(', ')
		const iconArrayTagsSplit = iconArrayTagsJoin.split(', ')
		const uniqueTagsSet = new Set(iconArrayTagsSplit)
		setUniqueTags([...uniqueTagsSet])
		
		//? определяем vfccbd ID для подсказки в поисковой строке
		const iconArrayIDs = iconsApprovedWithImgUrl.map(item => item.id)
		setListID(iconArrayIDs)
	}

	useEffect(() => {
		if (iconsCollectionData.length > 0) {
			setResource()
		} else {
			// todo определить HOC с выводом данных об ошибке
		}
	}, [])

	return (
		<Context.Provider value={value}>
			<Routes>
				<Route path='/' element={<IconsPage />} />
				<Route path='/instruction' element={<InstructionPage />} />
				<Route path='/legal' element={<LegalPage />} />
				<Route path='/not-found' element={<NotFoundPage />} />
				<Route path='/icon-:id' element={<IconPage />} />
				<Route path='/search=:id' element={<SearchPage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</Context.Provider>
	)
}

export default App
