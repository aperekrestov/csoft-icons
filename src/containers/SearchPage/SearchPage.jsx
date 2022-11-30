import PropTypes from 'prop-types'
import { useLocation } from 'react-router'
import Header from '@components/Header'
import styles from './SearchPage.module.css'

const SearchPage = ({searchText}) => {
	const location = useLocation()
	const serchText = location.pathname.split('/search=').join('')

	return (
		<>
			<Header searchText={serchText}/>
			{searchText}
		</>
	)
}

SearchPage.propTypes = {
	searchText: PropTypes.string
}

export default SearchPage
