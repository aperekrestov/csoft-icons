import { useEffect, useRef, useState } from 'react'
import { gsap } from "gsap"
import styles from './GoToTop.module.css'
import cn from 'classnames'
import topArrow from '@assets/vector-graphics/icon-0379-s.svg'

const GoToTop = () => {
	const topArrowRef = useRef()
	const [styleDisplayProp, setStyleDisplayProp] = useState('none')
	const [percentage, setPercentage] = useState(0)

	function scrollHandler(e) {
		if (e.target.documentElement.scrollTop > 300) {
			gsap.to(topArrowRef.current, { duration: 0.2, opacity: 1, display: 'flex' })
		} else {
			gsap.to(topArrowRef.current, { duration: 0.2, opacity: 0, display: 'none' })
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
		<div
			ref={topArrowRef}
			className={cn(`content_width_large content_indent`, styles.wrapper)}
			onClick={() => window.scroll(0, 0)}
			// style={visibleStyle()}
		>
			<div className={cn(styles.container)}>
				<img
					src={topArrow}
					alt="наверх"
					className={styles.go_to_top}
				/>
				<p className={cn(styles.progress_value)}>
					{percentage}
				</p>
			</div>
			
		</div>
	)
}

export default GoToTop
