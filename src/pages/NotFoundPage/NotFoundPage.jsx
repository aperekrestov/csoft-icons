import { useLocation } from 'react-router-dom'
import Header from '@components/Header'

// import styles from './NotFoundPage.module.css'

const NotFoundPage = () => {
	let location = useLocation()
	let addrass = decodeURI(location.pathname)
	console.log(addrass);
	// let addrass = decodeURI(location.pathname.split('/search=').join(''))

	return (
		<div className="wrapper">
			<Header searchText={""} />

			<section className={"content_width_middle padding_top_bottom_l"}>
				<h2>404</h2>
				{/* todo дописать стилизацию и полный адрес ссылки */}
				<p>К сожалению данной страницы не существует. Возможно допушена ошибка в адресной строке: <br />
					<b>
						<u>
							{addrass}
						</u>
					</b>
				</p>

			</section>

		</div>
	)
}

export default NotFoundPage
