import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import Header from '@components/Header'
import IconLinkBack from '@components/IconPage/IconLinkBack'
import IconTags from '@components/IconPage/IconTags'
import { getIconSvgUrl, getIconTags, getIconContent } from '@services/getIconData'
import { IconArray } from '@services/context'
import { 
	COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, 
	COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, 
	COLOR_13, COLOR_14, GENERAL_COLOR, 
	GENERAL_SIZE, ULTRA_SMALL, SMALL, MEDIOM } from '@constants/constants'

import corner_top_left from '@static/corner-top-left.svg'
import corner_top_right from '@static/corner-top-right.svg'
import corner_bottom_left from '@static/corner-bottom-left.svg'
import corner_bottom_right from '@static/corner-bottom-right.svg'
import pattern_alpha_light from '@static/pattern-alpha-light.svg'
import pattern_alpha_dark from '@static/pattern-alpha-dark.svg'

import cn from 'classnames'
import styles from './IconPage.module.css'

const IconPage = () => {
	window.scrollTo(0, 0)
	const { iconArray, setIconArray } = useContext(IconArray)
	
	const [iconSvgData, setIconSvgData] = useState(null)
	const [newIconColor, setNewIconColor] = useState(GENERAL_COLOR)
	const [newIconBg, setNewIconBg] = useState(pattern_alpha_light)
	const [newSize, setSize] = useState(GENERAL_SIZE)
	
	const iconId = useParams().id

	const errorMassege = 'Файл #' + iconId + ' размером ' + newSize + 'x' + newSize + ' не найден'

	async function fetchSvgData() {
		console.log(getIconSvgUrl(iconId, newSize));
		let res = await fetch(getIconSvgUrl(iconId, newSize))
		const resText = await res.text()

		if (resText.slice(0, 4) === '<svg') {
			setIconSvgData(resText)
			// todo response дает статус OK на несуществующий файл, нужно понять в чем причина и обработать корректно ошибку
			// console.log(iconSvgData)
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
	if (iconArray && iconContent === null) {
		iconContent = getIconContent(iconArray, iconId)
		iconTitle = iconContent.title
		iconImage = iconContent.img
		iconDateModification = iconContent.modificated
		iconTags = getIconTags(iconContent.tags)
	}

	const svgModificator = () => {
		return iconSvgData.replace(new RegExp(GENERAL_COLOR,"gi"), newIconColor)
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
			backgroundImage: 'url(' + newIconBg + ')'
		}
	}

	const blobFinalSvg = (svg) => {
		const blob = new Blob([svg], { type: "text/plain" })
		return URL.createObjectURL(blob)
	}

	function handleSizeChange(e) {
		switch (e.target.value) {
			case ULTRA_SMALL:
				setSize(ULTRA_SMALL)
				break
			case SMALL:
				setSize(SMALL)
				break
			case MEDIOM:
				setSize(MEDIOM)
				break
		
			default:
				setSize(GENERAL_SIZE)
				break
		}
	}
	function handleColorChange(e) {
		switch (e.target.value) {
			case '1':
				setNewIconColor(COLOR_1)
				setNewIconBg(pattern_alpha_dark)			
				break
			case '2':
				setNewIconColor(COLOR_2)
				setNewIconBg(pattern_alpha_light)
				break
			case '3':
				setNewIconColor(COLOR_3)
				setNewIconBg(pattern_alpha_light)		
				break
			case '4':
				setNewIconColor(COLOR_4)
				setNewIconBg(pattern_alpha_dark)		
				break
			case '5':
				setNewIconColor(COLOR_5)
				setNewIconBg(pattern_alpha_dark)		
				break
			case '6':
				setNewIconColor(COLOR_6)
				setNewIconBg(pattern_alpha_light)		
				break
			case '7':
				setNewIconColor(COLOR_7)
				setNewIconBg(pattern_alpha_light)		
				break
			case '8':
				setNewIconColor(COLOR_8)
				setNewIconBg(pattern_alpha_dark)			
				break
			case '9':
				setNewIconColor(COLOR_9)
				setNewIconBg(pattern_alpha_light)	
				break
			case '10':
				setNewIconColor(COLOR_10)
				setNewIconBg(pattern_alpha_light)		
				break
			case '11':
				setNewIconColor(COLOR_11)
				setNewIconBg(pattern_alpha_light)			
				break
			case '12':
				setNewIconColor(COLOR_12)
				setNewIconBg(pattern_alpha_light)		
				break
			case '13':
				setNewIconColor(COLOR_13)
				setNewIconBg(pattern_alpha_dark)		
				break
			case '14':
				setNewIconColor(COLOR_14)
				setNewIconBg(pattern_alpha_dark)			
				break

			default:
				setNewIconColor(GENERAL_COLOR)
				break;
		}
	}

	useEffect(()=>{
		fetchSvgData()
	}, [newSize])

	
	console.log('IconPage')
	return (
		<>		
			<div className="wrapper_grey_page">
				<Header searchText={""}/>

				<div className={"content_width_middle padding_top_bottom_l"}>

					<div className="margin_bottom_xl">
						<IconLinkBack />
					</div>

					<div className={styles.icon_page_flex}>	

						<section className={styles.container_info}>
							<div>
								<h3 className={"margin_bottom_u"}>Файл #{iconId}</h3>
								<span className="font_ultra">обновлен</span>
								<b className={"font_ultra margin_left_ultra_small"} >{iconDateModification}</b>
							</div>

							{iconImage && 
								<img className={"icon_container__image padding_top_bottom_m"} src={iconImage} alt={iconTitle} />
							}
						</section>
						
						<section>
							<form className="margin_bottom_xl">
								<div className="margin_bottom_m">
									<span className="font_ultra">размер:</span>
									<b className={"font_ultra margin_left_ultra_small"}>{newSize+'x'+newSize}</b>
								</div>

								<div className={styles.size_radio_btn_container}>
									<div className={styles.size_radio_btn}>
										<input id="radio-1" type="radio" name="radio" value={ULTRA_SMALL} onChange={handleSizeChange} />
										<label className="font_small" htmlFor="radio-1">8x8</label>
									</div>	
									<div className={styles.size_radio_btn}>
										<input id="radio-2" type="radio" name="radio" value={SMALL} onChange={handleSizeChange} />
										<label className="font_small" htmlFor="radio-2">16x16</label>
									</div>	
									<div className={styles.size_radio_btn}>
										<input id="radio-3" type="radio" name="radio" value={MEDIOM} defaultChecked onChange={handleSizeChange} />
										<label className="font_small" htmlFor="radio-3">24x24</label>
									</div>
								</div>
							</form>

							<form className="margin_bottom_xl">
								<div className="margin_bottom_m">
									<span className="font_ultra">цвет:</span>
									<b className={"font_ultra margin_left_ultra_small"}>{newIconColor}</b>
								</div>
								<input className={cn(styles.input_color, styles.color1, styles.input_dark)} type="radio" name="radio" value="1" onChange={handleColorChange} />	
								{/* <input className={cn(styles.input_color, styles.color14, styles.input_dark)} type="radio" name="radio" value="14" onChange={handleColorChange} /> */}
								{/* <input className={cn(styles.input_color, styles.color4, styles.input_dark)} type="radio" name="radio" value="4" onChange={handleColorChange} /> */}
								{/* <input className={cn(styles.input_color, styles.color5, styles.input_dark)} type="radio" name="radio" value="5" onChange={handleColorChange} /> */}
								<input className={cn(styles.input_color, styles.color12, styles.input_dark)} type="radio" name="radio" value="12" onChange={handleColorChange} />
								<input className={cn(styles.input_color, styles.color9, styles.input_dark)} type="radio" name="radio" value="9" onChange={handleColorChange} />
								<input className={cn(styles.input_color, styles.color7, styles.input_light)} type="radio" name="radio" value="7" onChange={handleColorChange} />
								<input className={cn(styles.input_color, styles.color10, styles.input_light)} type="radio" name="radio" value="10" defaultChecked onChange={handleColorChange} />
								<input className={cn(styles.input_color, styles.color2, styles.input_light)} type="radio" name="radio" value="2" onChange={handleColorChange} />
								<input className={cn(styles.input_color, styles.color3, styles.input_light)} type="radio" name="radio" value="3" onChange={handleColorChange} />
								{/* <input className={cn(styles.input_color, styles.color13, styles.input_dark)} type="radio" name="radio" value="13" onChange={handleColorChange} /> */}
								<input className={cn(styles.input_color, styles.color11, styles.input_light)} type="radio" name="radio" value="11" onChange={handleColorChange} />		
							</form>

							<div className="margin_bottom_xxl">
								<div className="font_ultra margin_bottom_m">результат:</div>
								
								{iconSvgData
									? 
									<div className={styles.result}>
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
									<p>{errorMassege}</p>
								}
							</div>

							{iconSvgData && <>
								<a className="font_small margin_bottom_l button_link" href={blobFinalSvg(svgModificator())} download={iconId + ".svg"}>Загрузить</a>
							</>}

							<div className="font_ultra margin_bottom_m">теги:</div>
							{iconTags && <IconTags iconTags={iconTags} />}
						</section>
					</div>
				</div>
			</div>
		</>
	)
}

export default IconPage