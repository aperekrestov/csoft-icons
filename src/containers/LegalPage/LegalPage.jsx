import Header from '@components/Header'
import styles from './LegalPage.module.css'

const LegalPage = () => {
	console.log('LegalPage')
	return (
		<>
			<Header searchText={""}/>

			<div className="content_width_middle padding_top_bottom_l">
				<h2>Пользовательское соглашение</h2>
			</div>
		</>
	)
}

export default LegalPage
