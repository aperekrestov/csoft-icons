import { useEffect, useRef, useState } from 'react'

import styles from './GoToTop.module.css'
import cn from 'classnames'
import topArrow from '@assets/vector-graphics/icon-0379-s.svg'

const GoToTop = () => {
	const topArrowRef = useRef()
	const [styleDisplayProp, setStyleDisplayProp] = useState('none')
	const [percentage, setPercentage] = useState(0)

	function scrollHandler(e) {
		if (e.target.documentElement.scrollTop > 300) {
			setStyleDisplayProp('block')
			// return
		} else {
			setStyleDisplayProp('none')
		}

		let h = document.documentElement,
			b = document.body,
			st = 'scrollTop',
			sh = 'scrollHeight'
		let percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100
		setPercentage(Math.round(percent) + '%')
	}

	const visibleStyle = () => {
		return {
			display: styleDisplayProp
		}
	}

	useEffect(() => {
		document.addEventListener('scroll', scrollHandler)
		return function () {
			document.removeEventListener('scroll', scrollHandler)
		}
	}, [])

	return (
		<div className={cn(styles.container, "content_width_large content_indent")}>
			<img
				ref={topArrowRef}
				src={topArrow}
				alt="наверх"
				onClick={() => window.scroll(0, 0)}
				className={styles.go_to_top}
				style={visibleStyle()}
			/>
			<p className={cn(styles.progress_value)}>
				{percentage}
			</p>
		</div>
	)
}

export default GoToTop
