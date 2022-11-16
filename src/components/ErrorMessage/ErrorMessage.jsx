import styles from './ErrorMessage.module.css'

const ErrorMessage = () => {
	return (
		<>
			<p className={styles.text}>
				Что-то пошло не так, попробуйте снова
			</p>
		</>
	)
}

export default ErrorMessage
