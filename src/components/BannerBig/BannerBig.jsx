import PropTypes from 'prop-types'

import cn from 'classnames'

import styles from './BannerBig.module.css'

const BannerBig = () => {
	return (
		<div className={cn(styles.bannerBig__wrapper)}>
			<div className="content_width_large">
				<h1 className={styles.bannerBig__header}>Визуальный язык позволяет общаться независимо от того, кто&nbsp;вы и где вы</h1>

				<div className={styles.bannerBig__img}></div>
				{/* <img src="img/banner-big-img-1400x128.svg" alt="графические иконки" /> */}
			</div>
		</div>
	)
}

BannerBig.propTypes = {
	text: PropTypes.string
}

export default BannerBig
