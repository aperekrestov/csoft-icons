import { useEffect, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { withErrorApi } from '@hoc/withErrorApi'
import routesConfig from '@routes/routesConfig'
import { IconArray } from '@services/context'
import { getIconsJson, getIconImage } from '@services/getIconData'
import { JSON_URL } from '@constants/constants'

const App = ({ setErrorApi }) => {
	// console.log('<React.StrictMode>')
	const { iconArray, setIconArray } = useContext(IconArray)
	
	const getResource = async (url) => {
		const res = await getIconsJson(url)

		if (res) {
			const arrIconFiltered = res.filter(function(item){
				return item.status === "true"
			})

			const iconsList = arrIconFiltered.map(({ id, title, status, tags, modificated }) => {
				const img = getIconImage(id)
				return {
					id,
					title, 
					img, 
					status, 
					tags,
					modificated
				}	
			})
			setIconArray(iconsList)
			setErrorApi(false)
		} else {
			setErrorApi(true)
		}
	}
	useEffect(() => {
		// getResource('http://test.perekrestov.ru/csoft-icons.json')
		getResource(JSON_URL)
	}, [])

	return (
		<>
			<BrowserRouter>
				<Routes>
					{routesConfig.map((route, index) => (
						<Route
							key={index}
							path={route.path}
							element={route.element}
						/>
					))}
				</Routes>

			</BrowserRouter>
		</>
	)
}

export default withErrorApi(App)
