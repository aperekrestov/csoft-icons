import { useLocation } from 'react-router-dom'

import styles from './NotFoundPage.module.css'

const NotFoundPage = () => {
	let location = useLocation()
	// location.pathname

	return (
		<div className="container_content">
			<h1>Страница не найдена</h1>
			<p>по адресу: <u>{location.pathname}</u></p>
		</div>
	)
}


export default NotFoundPage
