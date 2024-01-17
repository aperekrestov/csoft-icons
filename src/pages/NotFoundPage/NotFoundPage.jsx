import { useLocation } from 'react-router-dom'
import Header from '@components/Header'

import cn from 'classnames'
import styles from './NotFoundPage.module.css'

const NotFoundPage = () => {
	let location = useLocation()
	let addrass = decodeURI(location.pathname)
	// let addrass = decodeURI(location.pathname.split('/search=').join(''))

	return (
		<div className={cn(styles.bg_page_img, "wrapper bg_page")} >
			<Header searchText={""} />

			<section className="content_width_middle padding_top_bottom_l">
				<h2>404</h2>
				<p>К сожалению данной страницы не существует. Возможна ошибка в части адресной строки: 
					<br />
					<span className="warning_text font_ultra">...{addrass}</span>
				</p>

			</section>

		</div>
	)
}

export default NotFoundPage
