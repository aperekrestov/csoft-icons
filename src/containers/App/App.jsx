import { useEffect, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { withErrorApi } from '@hoc/withErrorApi'
import routesConfig from '@routes/routesConfig'
import { getIconResource } from '@utils/network'
import { IconArray } from '@services/context'
import { getIconImage } from '@services/getIconData'
import { JSON } from '@constants/constants'

const App = ({ setErrorApi }) => {
	const { iconArray, setIconArray } = useContext(IconArray)
	
	const getResource = async (url) => {
		const res = await getIconResource(url)

		const arrIconFiltered = res.filter(function(item){
			return item.status === "true"
		})

		if (arrIconFiltered) {
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
		getResource(JSON)
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
