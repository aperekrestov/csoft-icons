import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import IconsPage from '@pages/IconsPage'
import IconPage from '@pages/IconPage'
import LegalPage from '@pages/LegalPage'
import SearchPage from '@pages/SearchPage'
import NotFoundPage from '@pages/NotFoundPage'
import Context from '@context/context'

import { getIconImageUrl } from '@utils/getIconData'
import iconsCollectionData from '@data/csoft-icons-collection.json'

const App = () => {
	const setResource = () => {
		const iconsApproved = iconsCollectionData.filter(function (item) {
			return item.status === "true"
		})

		const iconsApprovedWithImgUrl = iconsApproved.map(({ id, title, modificated, tags }) => {
			const imgUrl = getIconImageUrl(id)
			return {
				id,
				title,
				modificated,
				imgUrl,
				tags
			}
		})
		setIconArrayDefault(iconsApprovedWithImgUrl)
	}
	
	const [iconArrayDefault, setIconArrayDefault] = useState([])

	const value = {
		iconArrayDefault
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
				<Route path='/legal' element={<LegalPage />} />
				<Route path='/icon-:id' element={<IconPage />} />
				<Route path='/search=:id' element={<SearchPage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</Context.Provider>
	)
}

export default App
