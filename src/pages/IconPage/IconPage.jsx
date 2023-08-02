import { useContext, useEffect, useState , useRef} from 'react'
import { useParams } from 'react-router'

import Header from '@components/Header'
import Footer from '@components/Footer'
import IconLinkBack from '@components/IconLinkBack'
import IconTags from '@components/IconPage/IconTags'
import { getIconSvgUrl, getIconTags, getIconContent } from '@utils/getIconData'
import { IconArray } from '@context/context'
import { 
	COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, 
	COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, 
	COLOR_13, COLOR_14, GENERAL_COLOR, 
	GENERAL_EXTENSION, PNG_EXTENSION, SVG_EXTENSION,
	GENERAL_SIZE, ULTRA_SMALL, SMALL, MEDIOM, LARGE, 
	X2_LARGE, X3_LARGE, X4_LARGE, X5_LARGE, X6_LARGE} from '@constants/constants'

import corner_top_left from '@assets/vector-graphics/corner-top-left.svg'
import corner_top_right from '@assets/vector-graphics/corner-top-right.svg'
import corner_bottom_left from '@assets/vector-graphics/corner-bottom-left.svg'
import corner_bottom_right from '@assets/vector-graphics/corner-bottom-right.svg'
// import pattern_alpha_light from '@assets/vector-graphics/pattern-alpha-light.svg'
// import pattern_alpha_dark from '@assets/vector-graphics/pattern-alpha-dark.svg'

import cn from 'classnames'
import styles from './IconPage.module.css'

const IconPage = () => {
	const { iconArray, setIconArray } = useContext(IconArray)
	
	const [iconSvgData, setIconSvgData] = useState(null)
	// const [newIconColor, setNewIconColor] = useState(GENERAL_COLOR)
	// const [newIconBg, setNewIconBg] = useState(pattern_alpha_light)
	const [newSize, setSize] = useState(GENERAL_SIZE)
	const [newExtention, setExtention] = useState(GENERAL_EXTENSION)
	
	const iconId = useParams().id

	const errorMassege = 'Файл #' + iconId + ' размером ' + newSize + 'x' + newSize + ' не найден'

	async function fetchSvgData() {
		let res = await fetch(getIconSvgUrl(iconId, GENERAL_SIZE))
		const resText = await res.text()
		if (resText.slice(0, 4) === '<svg') {
			setIconSvgData(resText)
			console.log(iconSvgData)
			// todo response дает статус OK на несуществующий файл, нужно понять в чем причина и обработать корректно ошибку
			return
		}
		console.error('ОШИБКА:', errorMassege)
		setIconSvgData(null)

		// todo response дает статус OK на несуществующий файл, нужно понять в чем причина и обработать корректно ошибку
		// const response = await fetch(url)
		// if (response.ok) {
		// 	let responseText= await response.text()
		// 	console.log(responseText)
		// 	setIconSvgData(responseText)
		// 	return responseText
		// } else {
		// 	console.error('ОШИБКА', response.status)
		// }
	}
	
	let iconContent = null
	let iconTitle = null
	let iconImage = null
	let iconDateModification = null
	let iconTags = null
	if (iconArray != null) {
		iconContent = getIconContent(iconArray, iconId)
		iconTitle = iconContent.title
		iconImage = iconContent.imgUrl
		iconDateModification = iconContent.modificated
		iconTags = getIconTags(iconContent.tags)
	}

	const svgModificator = () => {
		return iconSvgData.replace(new RegExp(`<svg width="${GENERAL_SIZE}" height="${GENERAL_SIZE}"`, "gi"), `<svg width="${newSize}" height="${newSize}"`)
	}	

	const iconStyle = (svg) => {
		return {
			width: newSize + 'px',
			height: newSize + 'px',
			backgroundImage: "url('data:image/svg+xml;base64," + window.btoa(svg) + "')"
			// ? window.btoa кодирует строку в base-64
		}
	}

	const iconContainerStyle = () => {
		return {
			// backgroundImage: 'url(' + newIconBg + ')'
			width: newSize + 'px',
			height: newSize + 'px'
		}
	}

	const blobFinalSvg = (svg) => {
		const blob = new Blob([svg], { type: "text/plain" })
		return URL.createObjectURL(blob)
	}

	function handleSizeChange(e) {
		switch (e.target.value) {
			case SMALL:
				setSize(SMALL)
				break
			case MEDIOM:
				setSize(MEDIOM)
				break
			case LARGE:
				setSize(LARGE)
				break
			case X2_LARGE:
				setSize(X2_LARGE)
				break
			case X3_LARGE:
				setSize(X3_LARGE)
				break
			case X4_LARGE:
				setSize(X4_LARGE)
				break
			case X5_LARGE:
				setSize(X5_LARGE)
				break
		
			default:
				setSize(GENERAL_SIZE)
				break
		}
	}
	function handleExtentionChange(e) {
		switch (e.target.value) {
			case SVG_EXTENSION:
				setExtention(SVG_EXTENSION)
				break
			case PNG_EXTENSION:
				setExtention(PNG_EXTENSION)
				break
		
			default:
				setExtention(SVG_EXTENSION)
				break
		}
	}

	useEffect(()=>{
		fetchSvgData()
	}, [newSize])

	useEffect(()=>{
		window.scrollTo(0, 0)
	}, [])

	
	console.log('IconPage')
	return (
		<>		
			<div className="wrapper grey_page">
				<Header />

				<div className={"content_width_middle padding_top_bottom_l content_height_auto"}>

					<div className="margin_bottom_xl">
						<IconLinkBack />
					</div>

					<div className={styles.icon_page_flex}>	

						<section className={styles.container_info}>
							<div>
								<h3>Файл #{iconId}</h3>
								<span className={"font_ultra margin_left_ultra_small"} >{iconDateModification}</span>
							</div>

							{iconImage && 
								<img className={cn(styles.icon, "padding_top_bottom_m")} src={iconImage} alt={iconTitle} />
							}
						</section>
						
						<section>
							<form className="margin_bottom_xl">
								<div className="margin_bottom_m">
									<span className="font_ultra">размер:</span>
									<b className={"font_ultra margin_left_ultra_small"}>{newSize+'*'+newSize}</b>
								</div>

								<div className={styles.size_radio_btn_container}>
									<div className={styles.size_radio_btn}>
										<input id="radio-1" type="radio" name="radio" value={SMALL} onChange={handleSizeChange} />
										<label className="font_small" htmlFor="radio-1">{SMALL}</label>
									</div>	
									<div className={styles.size_radio_btn}>
										<input id="radio-2" type="radio" name="radio" value={MEDIOM} onChange={handleSizeChange} />
										<label className="font_small" htmlFor="radio-2">{MEDIOM}</label>
									</div>	
									<div className={styles.size_radio_btn}>
										<input id="radio-3" type="radio" name="radio" value={LARGE} defaultChecked onChange={handleSizeChange} />
										<label className="font_small" htmlFor="radio-3">{LARGE}</label>
									</div>
									<div className={styles.size_radio_btn}>
										<input id="radio-4" type="radio" name="radio" value={X2_LARGE} onChange={handleSizeChange} />
										<label className="font_small" htmlFor="radio-4">{X2_LARGE}</label>
									</div>
									<div className={styles.size_radio_btn}>
										<input id="radio-5" type="radio" name="radio" value={X3_LARGE} onChange={handleSizeChange} />
										<label className="font_small" htmlFor="radio-5">{X3_LARGE}</label>
									</div>
									<div className={styles.size_radio_btn}>
										<input id="radio-6" type="radio" name="radio" value={X4_LARGE} onChange={handleSizeChange} />
										<label className="font_small" htmlFor="radio-6">{X4_LARGE}</label>
									</div>
									<div className={styles.size_radio_btn}>
										<input id="radio-7" type="radio" name="radio" value={X5_LARGE} onChange={handleSizeChange} />
										<label className="font_small" htmlFor="radio-7">{X5_LARGE}</label>
									</div>
								</div>
							</form>

							<form className="margin_bottom_xl">
								<div className="margin_bottom_m">
									<span className="font_ultra">формат:</span>
									<b className={"font_ultra margin_left_ultra_small"}>{iconId}{newExtention}</b>
								</div>

								<div className={styles.size_radio_btn_container}>
									<div className={styles.size_radio_btn}>
										<input id="radio-png" type="radio" name="radio" value={PNG_EXTENSION} onChange={handleExtentionChange} />
										<label className="font_small" htmlFor="radio-png">{PNG_EXTENSION}</label>
									</div>	
									<div className={styles.size_radio_btn}>
										<input id="radio-svg" type="radio" name="radio" value={SVG_EXTENSION} defaultChecked onChange={handleExtentionChange} />
										<label className="font_small" htmlFor="radio-svg">{SVG_EXTENSION}</label>
									</div>
								</div>
							</form>

							<div className={cn(styles.result_section)}>
								<div className="font_ultra margin_bottom_m">результат:</div>
								
								{iconSvgData
									? 
									<div className={cn(styles.result, "margin_bottom_xxl")}>
										<div className={styles.result__corners_container}>
											<img src={corner_top_left} alt="рамка" />
											<img src={corner_top_right} alt="рамка" />
										</div>
										<div className={styles.result__icon_container} style={iconContainerStyle()}>
										<div style={iconStyle(svgModificator())}></div>
										</div>
										<div className={styles.result__corners_container}>
											<img src={corner_bottom_left} alt="рамка" />
											<img src={corner_bottom_right} alt="рамка" />
										</div>
									</div>
									:
									<p className="margin_bottom_xxl warning_text font_ultra">{errorMassege}</p>
								}
								
								{iconSvgData && <>
									<a className={cn(styles.button_link, "font_small margin_bottom_l")} href={blobFinalSvg(svgModificator())} download={iconId + ".svg"}>Загрузить</a>
								</>}

								<div className="font_ultra margin_bottom_m">теги:</div>
								{iconTags && <IconTags iconTags={iconTags} />}
							</div>

						</section>
					</div>
				</div>
				
				<Footer />
			</div>
		</>
	)
}

export default IconPage