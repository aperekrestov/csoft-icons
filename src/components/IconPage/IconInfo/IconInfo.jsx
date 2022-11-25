import PropTypes from 'prop-types'
// import styles from './IconInfo.module.css'

const IconInfo = ({ iconInfo }) => {
	return (
		<>
			<div>
				<ul>
					{iconInfo.map(({ title, data }) => (
						data && (
							<li key={title}>
								<span>{title}: {data}</span>
							</li>
						)
					))}
				</ul>
			</div>
		</>
	)
}

IconInfo.propTypes = {
	text: PropTypes.array,
}

export default IconInfo
