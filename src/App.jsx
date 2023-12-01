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
	const [iconsArray, setIconArray] = useState([])
	const [loader, setLoader] = useState(0)

	const loaderUpdate = (n) => {
		if (iconsArray.length === n) {
			//? вычисляем процент позиуии ползунка прокрутки от общей высоты документа
			let h = document.documentElement,
				b = document.body,
				st = 'scrollTop',
				sh = 'scrollHeight'
			let percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100
			setLoader(Math.round(percent) + '%')
			// let contentHeight = Math.max(
			// 	document.body.scrollHeight, document.documentElement.scrollHeight,
			// 	document.body.offsetHeight, document.documentElement.offsetHeight,
			// 	document.body.clientHeight, document.documentElement.clientHeight
			// );
			// setLoader(Math.round(window.pageYOffset * 100 / contentHeight) + '%')

		} else {
			//? округляем в большую сторону
			//? вычисляем процент от числа подгрузившихся иконок
			setLoader(Math.ceil(n * 100 / iconsArray.length) + '%')
			//todo определить вектор движение скролла при частичном отображении массива иконок и отобразать текущее значение прокрутки
		}
	}

	const value = {
		iconsArray,
		loader,
		loaderUpdate
	}

	const setResource = () => {
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
		// console.log(iconsApprovedWithImgUrl)
		setIconArray(iconsApprovedWithImgUrl)
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
