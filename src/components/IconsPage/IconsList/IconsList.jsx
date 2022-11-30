import { useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import useScrollPosition from '@hoc/useScrollPosition'
import IconImage from '@components/IconPage/IconImage'
import ScrollTop from '@services/context'
import styles from './IconsList.module.css'

const IconsList = ({ icons }) => {
	const scrollPosition = useScrollPosition()
	const {scrollTop, setScrollTop } = useContext(ScrollTop)

	function click(e) {
		setScrollTop(scrollPosition)
	}

	const searcParam = "папка"

	const arrAfterSearch = icons.filter(function(item){
		return item.tags.toLowerCase().includes(searcParam.toLowerCase())
	})
	// console.log(arrAfterSearch)

	return (
		<ul className={styles.list__container}>
			{icons.map(({id, title, img}) =>
				<li className="icon_container" key={id}>
					<Link to={`icon-${id}`} onClick={click}>
						<IconImage iconImage={img} iconTitle={title}/>
					</Link>
				</li>
			)}
		</ul>
	)
}

IconsList.propTypes = {
	icons: PropTypes.array
}

export default IconsList
