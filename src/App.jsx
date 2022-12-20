import { useEffect, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import routesConfig from '@routes/routesConfig'
import IconsPage from '@pages/IconsPage'
import IconPage from '@pages/IconPage'
import LegalPage from '@pages/LegalPage'
import SearchPage from '@pages/SearchPage'
import NotFoundPage from '@pages/NotFoundPage'
import { IconArray } from '@context/context'
import { getIconImageUrl } from '@utils/getIconData'
import iconsCollectionData from '@data/csoft-icons-collection.json'

const App = () => {
	const { iconArray, setIconArray } = useContext(IconArray)

	const setResource = () => {
		const iconsApproved = iconsCollectionData.filter(function(item){
			return item.status === "true"
		})
		
		const iconsApprovedWithImgUrl = iconsApproved.map(({id, title, modificated, tags}) => {
			const imgUrl = getIconImageUrl(id)
			return {
				id, 
				title, 
				modificated, 
				imgUrl, 
				tags
			}
		})

		setIconArray(iconsApprovedWithImgUrl)
	}


	useEffect(() => {
		if(iconsCollectionData.length > 0 ) {
			setResource()
		} else {
			// todo определить HOC с выводом данных об ошибке
		}
	}, [])

	return (
		<>		
			<Routes>
				<Route path='/' element={<IconsPage />} />
				<Route path='/legal' element={<LegalPage />} />
				<Route path='/icon-:id' element={<IconPage />} />
				<Route path='/icons?icon=:id' element={<SearchPage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>

			{/* <BrowserRouter>
				<Routes>
					{routesConfig.map((route, index) => (
						<Route
							key={index}
							path={route.path}
							element={route.element}
						/>
					))}
				</Routes>

			</BrowserRouter> */}
		</>
	)
}

export default App
