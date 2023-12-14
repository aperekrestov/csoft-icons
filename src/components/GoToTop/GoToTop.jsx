import { useEffect, useRef, useState } from 'react'
import { gsap } from "gsap"
import ScrollToPlugin from "gsap/ScrollToPlugin";
import styles from './GoToTop.module.css'
import cn from 'classnames'
import topArrow from '@assets/vector-graphics/icon-0379-s.svg'

const GoToTop = () => {
	gsap.registerPlugin(ScrollToPlugin)
	const topArrowRef = useRef()
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

	function goTop() {
		if(window) {
			gsap.to(window, { duration: 2, scrollTo: { y: 0, x: 0 }, ease: 'power2.inOut' })
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
			onClick={goTop}
			// onClick={() => window.scroll(0, 0)}
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
