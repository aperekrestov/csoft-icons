import { useEffect, useState, useRef } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router'
import dateFormat, { } from "dateformat"

import Context from '@context/context'
import Header from '@components/Header'
import Footer from '@components/Footer'
import IconLinkBack from '@components/IconLinkBack'
import IconTags from '@components/IconPage/IconTags'
import { getIconSvgUrl, getIconTags, getIconContent } from '@utils/getIconData'
import {
	GENERAL_EXTENSION, PNG_EXTENSION, SVG_EXTENSION,
	GENERAL_SIZE, SMALL, MEDIUM, LARGE,
	X2_LARGE, X3_LARGE, X4_LARGE, X5_LARGE
} from '@constants/constants'

import corner_top_left from '@assets/vector-graphics/corner-top-left.svg'
import corner_top_right from '@assets/vector-graphics/corner-top-right.svg'
import corner_bottom_left from '@assets/vector-graphics/corner-bottom-left.svg'
import corner_bottom_right from '@assets/vector-graphics/corner-bottom-right.svg'

import cn from 'classnames'
import styles from './IconPage.module.css'

const IconPage = () => {
	const [iconSvgData, setIconSvgData] = useState(null)
	const [iconConvertedMetaDataModified, setIconConvertedMetaDataModified] = useState(null)
	const [iconMetaDataModified, setIconMetaDataModified] = useState(null)
	const [iconUrl, setIconUrl] = useState(null)
	const [iconTitle, setIconTitle] = useState(null)
	const [iconTags, setIconTags] = useState(null)

	const [newSize, setSize] = useState(GENERAL_SIZE)
	const [newExtention, setNewExtention] = useState(GENERAL_EXTENSION)

	const iconId = useParams().id
	const imgDOMIcon = useRef(null)
	const value = useContext(Context)
	const errorMassege = 'Файл #' + iconId + ' размером ' + newSize + 'x' + newSize + ' не найден'

	let iconContent = null

	async function fetchSvgData() {
		let iconSrcLink = GENERAL_SIZE
		if (Number(newSize) >= Number(LARGE)) {
			iconSrcLink = LARGE
		} else {
			iconSrcLink = newSize
		}
		let response = await fetch(getIconSvgUrl(iconId, iconSrcLink))
		const responseIconText = await response.text()
		if (responseIconText.slice(0, 4) === '<svg') {
			setIconSvgData(responseIconText)
			return
		}
		console.error('ОШИБКА:', 'Исходник #' + iconId + ' размером ' + iconSrcLink + 'x' + iconSrcLink + ' не найден')
		setIconSvgData(null)

		//todo response дает статус OK на несуществующий файл, нужно понять в чем причина и обработать корректно ошибку
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

	function setIconData() {
		//? определяем данные 
		if (value.iconsArray.length > 0) {
			for (let i = 0; i < value.iconsArray.length; i++) {
				if (value.iconsArray[i].id === iconId) {
					iconContent = getIconContent(value.iconsArray, iconId)
					setIconUrl(iconContent.imgUrl)
					setIconTitle(iconContent.title)
					setIconTags(getIconTags(iconContent.tags))
					setIconMetaDataModified(fetchHeader(iconContent.imgUrl, 'Last-Modified'))
					setIconConvertedMetaDataModified('создан ' + dateFormat(iconMetaDataModified, 'dd.mm.yyyy'))
					//? проверяем соответствие введенного ID в адресной строке со списками массива иконок
					return
				}
			}
			setIconConvertedMetaDataModified('отсутствует')
		}
	}

	function fetchHeader(url, wch) {
		try {
			var req = new XMLHttpRequest();
			req.open("HEAD", url, false);
			req.send(null);
			if (req.status === 200) {
				return req.getResponseHeader(wch);
			}
			else return false;
		} catch (er) {
			return er.message;
		}
	}

	function geticonIndex() {
		if (value.iconsArray.length > 0) {
			return value.iconsArray.findIndex(i => i.id === iconId)
		}
		return 0
	}

	const svgModificator = () => {
		return iconSvgData.replace(new RegExp(`<svg width="${GENERAL_SIZE}" height="${GENERAL_SIZE}"`, "gi"), `<svg width="${newSize}" height="${newSize}"`)
	}

	const iconStyle = (svg) => {
		return {
			width: newSize + 'px',
			height: newSize + 'px',
			backgroundImage: "url('data:image/svg+xml; base64," + window.btoa(svg) + "')"
			//? window.btoa кодирует строку в base-64
		}
	}

	const iconContainerStyle = () => {
		return {
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
			case MEDIUM:
				setSize(MEDIUM)
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
				setNewExtention(SVG_EXTENSION)
				break
			case PNG_EXTENSION:
				setNewExtention(PNG_EXTENSION)
				break

			default:
				setNewExtention(SVG_EXTENSION)
				break
		}
	}
	function handleClick() {
		if (newExtention === SVG_EXTENSION) {
			triggerDownload(blobFinalSvg(svgModificator()), iconId + ".svg");
		} else {
			downloadSvg(iconId + PNG_EXTENSION)
		}
	}

	function triggerDownload(imgURI, fileName) {
		let evt = new MouseEvent("click", {
			view: window,
			bubbles: false,
			cancelable: true
		});
		let a = document.createElement("a")
		a.setAttribute("download", fileName)
		a.setAttribute("href", imgURI)
		a.setAttribute("target", '_blank')
		a.dispatchEvent(evt)
	}
	function downloadSvg(fileName) {
		let canvas = document.createElement("canvas")
		canvas.width = newSize
		canvas.height = newSize
		let ctx = canvas.getContext("2d")
		ctx.clearRect(0, 0, newSize, newSize)
		let DOMURL = window.URL || window.webkitURL || window
		let img = new Image()
		let svgBlob = new Blob([svgModificator()], { type: "image/svg+xml;charset=utf-8" })
		let url = DOMURL.createObjectURL(svgBlob)

		img.onload = function () {
			ctx.drawImage(img, 0, 0)
			DOMURL.revokeObjectURL(url)
			if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
				let blob = canvas.msToBlob()
				navigator.msSaveOrOpenBlob(blob, fileName)
			}
			else {
				let imgURI = canvas
					.toDataURL("image/png")
					.replace("image/png", "image/octet-stream")
				triggerDownload(imgURI, fileName)
			}
			// document.removeChild(canvas)
			canvas = null
		};
		img.src = url;
	}

	useEffect(() => {
		fetchSvgData()
	}, [newSize])

	useEffect(() => {
		window.scrollTo(0, 0)
		setIconData()
	}, [value.iconsArray])



	return (
		<>
			<div className="wrapper grey_page">
				<Header />

				<div className="content_width_middle padding_top_bottom_l content_height_auto">

					<div className="margin_bottom_xl">
						<IconLinkBack iconIndex={geticonIndex()} />
					</div>

					<div className={styles.icon_page_flex}>

						<section className={styles.container_info}>
							<div>
								<h3>ID <i>{iconId}</i></h3>
								<span className={"font_ultra margin_left_ultra_small"} >{iconConvertedMetaDataModified}</span>
							</div>

							{iconUrl &&
								// <img ref={imgDOMIcon} className={cn(styles.icon, "padding_top_bottom_m")} src={'./csoft-icons-collection/monalisa.jpg'} alt={iconTitle} />
								<img ref={imgDOMIcon} className={cn(styles.icon, "padding_top_bottom_m")} src={iconUrl} alt={iconTitle} />
							}
						</section>

						<section>
							{iconSvgData &&
								<>
									<form className="margin_bottom_xl">
										<div className="margin_bottom_m">
											<span className="font_ultra">размер:</span>
											<b className={"font_ultra margin_left_ultra_small"}>{newSize + '*' + newSize}</b>
										</div>

										<div className={styles.size_radio_btn_container}>
											<div className={styles.size_radio_btn}>
												<input id="radio-1" type="radio" name="radio" value={SMALL} onChange={handleSizeChange} />
												<label className="font_small" htmlFor="radio-1">{SMALL}</label>
											</div>
											<div className={styles.size_radio_btn}>
												<input id="radio-2" type="radio" name="radio" value={MEDIUM} onChange={handleSizeChange} />
												<label className="font_small" htmlFor="radio-2">{MEDIUM}</label>
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
								</>
							}
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
								{iconSvgData &&
									<div className={cn(styles.button_link, "font_small margin_bottom_l")} onClick={handleClick} >Загрузить</div>
								}

								{iconTags &&
									<>
										<div className="font_ultra margin_bottom_m">теги:</div>
										<IconTags iconTags={iconTags} />
									</>
								}
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