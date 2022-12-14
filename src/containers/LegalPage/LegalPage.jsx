import Header from '@components/Header'
import Footer from '@components/Footer'
import styles from './LegalPage.module.css'

const LegalPage = () => {
	console.log('LegalPage')
	return (
		<div className="wrapper">
			<Header searchText={""}/>

			<div className="content_width_middle padding_top_bottom_l content_height_auto">
				<h2>Пользовательское соглашение</h2>
			</div>

			<Footer />
		</div>
	)
}

export default LegalPage
