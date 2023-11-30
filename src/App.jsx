import { useEffect, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import IconsPage from '@pages/IconsPage'
import IconPage from '@pages/IconPage'
import LegalPage from '@pages/LegalPage'
import SearchPage from '@pages/SearchPage'
import NotFoundPage from '@pages/NotFoundPage'
import Context, { Provider } from '@context/context'

import { getIconImageUrl } from '@utils/getIconData'
import iconsCollectionData from '@data/csoft-icons-collection.json'

const App = () => {
	// const [iconArrayDefault, setIconArrayDefault] = useContext(Context)
	

	// const setResource = () => {
	// 	const iconsApproved = iconsCollectionData.filter(function (item) {
	// 		return item.status === "true"
	// 	})

	// 	const iconsApprovedWithImgUrl = iconsApproved.map(({ id, title, modificated, tags }) => {
	// 		const imgUrl = getIconImageUrl(id)
	// 		return {
	// 			id,
	// 			title,
	// 			modificated,
	// 			imgUrl,
	// 			tags
	// 		}
	// 	})
	// 	// console.log(iconsApprovedWithImgUrl);
	// 	setIconArrayDefault(iconsApprovedWithImgUrl)
	// }

	// const [iconArrayDefault, setIconArrayDefault] = useState([])
	// const [loader, setLoader] = useState(0)
	// const loaderUpdate = (n) => {
	// 	console.log(`loader update ${n}`)
	// 	setLoader(n)
	// 	console.log(`${loader} - значение в контексте`)
	// }

	// const value = {
	// 	iconArrayDefault,
	// 	loader,
	// 	loaderUpdate
	// }


	// useEffect(() => {
	// 	if (iconsCollectionData.length > 0) {
	// 		setResource()
	// 	} else {
	// 		// todo определить HOC с выводом данных об ошибке
	// 	}
	// }, [])

	return (
		<Provider>
			<Routes>
				<Route path='/' element={<IconsPage />} />
				<Route path='/legal' element={<LegalPage />} />
				<Route path='/icon-:id' element={<IconPage />} />
				<Route path='/search=:id' element={<SearchPage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</Provider>
	)
}

export default App
