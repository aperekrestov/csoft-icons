import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import Header from '@components/Header'
import IconLinkBack from '@components/IconPage/IconLinkBack'
import IconTags from '@components/IconPage/IconTags'
import { getIconImage } from '@services/getIconData'
import { getIconTags } from '@services/getIconData'
import { IconArray } from '@services/context'
import { 
	COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, 
	COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, 
	COLOR_13, COLOR_14, GENERAL_COLOR, 
	GENERAL_SIZE, ULTRA_SMALL, SMALL, MEDIOM } from '@constants/constants'

import cn from 'classnames'
import styles from './IconPage.module.css'

const IconPage = () => {
	// const inlineSVG = `<svg width="19" height="19" viewBox="0 0 190 190" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 91C0 96 2 100 5 103L79 178C86 184 97 184 103 178L175 106C181 100 181 89 175 82L101 8C97 5 93 3 89 3H17C7 3 0 10 0 19V91ZM39 25C49 25 56 33 56 42 56 51 49 59 39 59 30 59 23 51 23 42 23 33 30 25 39 25Z" fill="firebrick"/></svg>`
	window.scrollTo(0, 0)

	const [svgIcon, setSvgIcon] = useState(null)
	const [newColor, setNewColor] = useState(GENERAL_COLOR)
	// const [currentSize, setCurrentSize] = useState(GENERAL_SIZE)
	const [newSize, setSize] = useState(GENERAL_SIZE)

	const { iconArray, setIconArray } = useContext(IconArray)
	const clickedIdIcon = useParams().id
	
	let iconTitle = null
	let iconImage = null
	let iconTags = null
	let iconInfo = null
	
	if (iconArray) {
		for (let index = 0; index < iconArray.length; index++) {
			if(iconArray[index].id === clickedIdIcon){
				iconTitle = iconArray[index].title
				iconImage = getIconImage(clickedIdIcon)
				iconTags = getIconTags(iconArray[index].tags)
				iconInfo = ([
					{ title: 'Id', data: iconArray[index].id },
					{ title: 'Title', data: iconArray[index].title },
					{ title: 'Modificated', data: iconArray[index].modificated },
				])
			}			
		}
		getSvgData(iconImage)
	}

	async function getSvgData(url) {
		let response = await fetch(url)
		if (response.ok) {
			let data = await response.text()
			setSvgIcon(data)
			return data
		} else {
			alert('error', response.status);
		}
	}

	const modificatedSvg = () => {
		return svgIcon.replace(new RegExp(GENERAL_COLOR,"gi"), newColor)
	}
	
	const svg64 = (svgData) =>  {
		return window.btoa(svgData)
	}
	
	const getIconStyle = (data) => {
		return {
			width: '24px',
			height: '24px',
			backgroundImage: "url('data:image/svg+xml;base64," + svg64(data) + "')"
		}
	}

	function handleFormChange(e) {
		console.log(e.target.value);
		switch (e.target.value) {
			case '1':
				setNewColor(COLOR_1)			
				break
			case '2':
				setNewColor(COLOR_2)			
				break
			case '3':
				setNewColor(COLOR_3)			
				break
			case '4':
				setNewColor(COLOR_4)			
				break
			case '5':
				setNewColor(COLOR_5)			
				break
			case '6':
				setNewColor(COLOR_6)			
				break
			case '7':
				setNewColor(COLOR_7)			
				break
			case '8':
				setNewColor(COLOR_8)			
				break
			case '9':
				setNewColor(COLOR_9)			
				break
			case '10':
				setNewColor(COLOR_10)			
				break
			case '11':
				setNewColor(COLOR_11)			
				break
			case '12':
				setNewColor(COLOR_12)			
				break
			case '13':
				setNewColor(COLOR_13)			
				break
			case '14':
				setNewColor(COLOR_14)			
				break

			default:
				setNewColor(GENERAL_COLOR)
				break;
		}
	}

	return (
		<>		
			<div className="wrapper_grey_page">
				<Header searchText={""}/>

				<div className={"content_width_middle padding_top_bottom_l"}>

					<IconLinkBack />

					<div className={styles.icon_page_flex}>	

						<section className={styles.container_info}>
							{iconInfo && 
								<div>
									<h3>Файл #{iconInfo[0].data}</h3>
									<span className="font_ultra">обновлен</span>
									<b className={"font_ultra margin_left_ultra_small"} >{iconInfo[2].data}</b>
								</div>
							}
							{iconImage && 
								<img className={"icon_container__image padding_top_bottom_m"} src={iconImage} alt={iconTitle} />
							}
						</section>
						
						<section>
							<form className="margin_bottom_m">
								<div className="margin_bottom_s">
									<span className="font_ultra">цвет:</span>
									<b className={"font_ultra margin_left_ultra_small"}>{newColor}</b>
								</div>
								<input className={styles.color1} type="radio" name="radio" value="1" onChange={handleFormChange} />	
								<input className={styles.color14} type="radio" name="radio" value="14" onChange={handleFormChange} />
								<input className={styles.color4} type="radio" name="radio" value="4" onChange={handleFormChange} />
								<input className={styles.color5} type="radio" name="radio" value="5" onChange={handleFormChange} />
								<input className={styles.color12} type="radio" name="radio" value="12" onChange={handleFormChange} />
								<input className={styles.color9} type="radio" name="radio" value="9" onChange={handleFormChange} />
								<input className={styles.color7} type="radio" name="radio" value="7" onChange={handleFormChange} />
								<input className={styles.color10} type="radio" name="radio" value="10" onChange={handleFormChange} />
								<input className={styles.color2} type="radio" name="radio" value="2" onChange={handleFormChange} />
								<input className={styles.color3} type="radio" name="radio" value="3" onChange={handleFormChange} />
								<input className={styles.color13} type="radio" name="radio" value="13" onChange={handleFormChange} />
								<input className={styles.color11} type="radio" name="radio" value="11" onChange={handleFormChange} />		
							</form>

							<div className="margin_bottom_m">
								<div className="font_ultra margin_bottom_s">результат:</div>
								{/* <img className={styles.test} src={`data:image/svg+xml;charset=utf-8,${inlineSVG}`} alt="" />
								<img src={`data:image/svg+xml;charset=utf-8,${inlineSVG}`}/> */}
								{svgIcon && <div style={getIconStyle(modificatedSvg())}></div>}
							</div>


							<div className="font_ultra margin_bottom_s">теги:</div>
							{iconTags && <IconTags iconTags={iconTags} />}	
						</section>
					</div>
				</div>
			</div>
		</>
	)
}

export default IconPage