import topArrow from '@assets/vector-graphics/icon-0379-s.svg'
import { useEffect, useRef, useState } from 'react'
import styles from './GoToTop.module.css'
import cn from 'classnames'

const GoToTop = () => {
	const topArrowRef = useRef()
	const [styleDisplayProp, setStyleDisplayProp] = useState('none')

	function scrollHandler(e) {
		if(e.target.documentElement.scrollTop > 300){
			setStyleDisplayProp('block')
			return
		}
		setStyleDisplayProp('none')
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
		</div>
	)
}

export default GoToTop
