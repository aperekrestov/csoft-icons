import PropTypes from 'prop-types'
import styles from './BannerBig.module.css'

const BannerBig = () => {
	return (
		<div className={styles.bannerBig__wrapper}>
			<div className="content_width_max container_content">
				<h1 className={styles.bannerBig__header}>Визуальный язык позволяет общаться независимо от того, кто вы и где вы</h1>

				<div className={styles.bannerBig__img}></div>
			</div>
		</div>
	)
}

BannerBig.propTypes = {
	text: PropTypes.string
}

export default BannerBig
