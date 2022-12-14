import cn from 'classnames'
import styles from './Footer.module.css'

const Footer = () => {
	return (
		<div className={styles.footer_container}>
			<a href="https://www.csoft.ru/" target="_blank" className={cn("font_small", styles.copyright)}>© CSoft</a>
		</div>
	)
}

export default Footer
