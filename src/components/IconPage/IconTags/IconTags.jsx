import PropTypes from 'prop-types'

import cn from "classnames"

import styles from './IconTags.module.css'

const IconTags = ({ iconTags }) => {
	return (
		<>
			<ul className={styles.tags_list}>
				{iconTags.map(tag => 
					<li key={tag} className={cn("font_ultra", styles.tag)}>
						{tag}
					</li>
				)}
			</ul>
		</>
	)
}

IconTags.propTypes = {
	iconTags: PropTypes.array
}

export default IconTags
