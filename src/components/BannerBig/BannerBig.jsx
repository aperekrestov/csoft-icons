import PropTypes from 'prop-types'

import cn from 'classnames'

import styles from './BannerBig.module.css'

const BannerBig = () => {
	return (
		<div className={cn(styles.bannerBig__wrapper)}>
			<h1 className={cn(styles.bannerBig__header, "content_indent width_limiter")}>Визуальный язык позволяет общаться независимо от того, кто&nbsp;вы и где вы</h1>
			<div className={styles.bannerBig__img}></div>
		</div>
	)
}

BannerBig.propTypes = {
	text: PropTypes.string
}

export default BannerBig
