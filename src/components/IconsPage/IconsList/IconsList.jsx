import { useContext } from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import useScrollPosition from '@hoc/useScrollPosition'
import IconImage from '@components/IconPage/IconImage'
import { ScrollTop } from '@services/context'
import styles from './IconsList.module.css'

const IconsList = ({iconArray}) => {
	const scrollPosition = useScrollPosition()
	const {scrollTop, setScrollTop } = useContext(ScrollTop)

	function click(e) {
		setScrollTop(scrollPosition)
	}

	return (
		<ul className={styles.list__container}>
			{iconArray && (iconArray.map(({id, title, img}) =>
				<li className="icon_container" key={id}>
					<Link to={`icon-${id}`} onClick={click}>
						<IconImage iconImage={img} iconTitle={title}/>
					</Link>
				</li>
			))}
		</ul>
	)
}

IconsList.propTypes = {
	iconArray: PropTypes.array
}

export default IconsList
