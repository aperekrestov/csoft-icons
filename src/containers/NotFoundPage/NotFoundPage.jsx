import { useLocation } from 'react-router-dom'
import Header from '@components/Header'

import styles from './NotFoundPage.module.css'

const NotFoundPage = () => {
	let location = useLocation()
	// location.pathname

	return (
		<>
			<Header searchText={""}/>

			<section className={"content_width_large padding_top_bottom_l"}>

				<h1>Страница не найдена</h1>
				<p>по адресу: <u>{location.pathname}</u></p>
			</section>

		</>
	)
}


export default NotFoundPage
