import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import Header from '@components/Header'
import IconLinkBack from '@components/IconPage/IconLinkBack'
import IconTags from '@components/IconPage/IconTags'
import { getIconImage } from '@services/getIconData'
import { getIconTags } from '@services/getIconData'
import { IconArray } from '@services/context'

import styles from './IconPage.module.css'

const IconPage = () => {
	window.scrollTo(0, 0)


	const image = '<svg xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="tiny" width="47.4" height="40.65" viewBox="21 18.5 158 135.5"><path d="M25,50 l150,0 0,100 -150,0 z" stroke-width="4" stroke="black" fill="rgb(128,224,255)" fill-opacity="1" ></path><path d="M25,50 L175,150 M25,150 L175,50" stroke-width="4" stroke="black" fill="black" ></path><g transform="translate(0,0)" stroke-width="4" stroke="black" fill="none" ><circle cx="100" cy="30" r="7.5" fill="black" ></circle><circle cx="70" cy="30" r="7.5" fill="black" ></circle><circle cx="130" cy="30" r="7.5" fill="black" ></circle></g></svg>'	

	let inlineSVG6 = `<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M19 6H5V23H19V6ZM9 21L9 9H7L7 21H9ZM13 9L13 21H11L11 9H13ZM17 21L17 9H15L15 21H17Z' fill='#0C121C'/><rect x='3' y='3' width='18' height='2' fill='#0C121C'/><rect x='9' y='1' width='6' height='1' fill='#0C121C'/><rect x='9' y='1' width='1' height='2' fill='#0C121C'/><rect x='14' y='1' width='1' height='2' fill='#0C121C'/></svg>`
	const inlineSVG3 = `
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path fill-rule="evenodd" clip-rule="evenodd" d="M19 6H5V23H19V6ZM9 21L9 9H7L7 21H9ZM13 9L13 21H11L11 9H13ZM17 21L17 9H15L15 21H17Z" fill="#0C121C"/>
	<rect x="3" y="3" width="18" height="2" fill="#0C121C"/>
	<rect x="9" y="1" width="6" height="1" fill="#0C121C"/>
	<rect x="9" y="1" width="1" height="2" fill="#0C121C"/>
	<rect x="14" y="1" width="1" height="2" fill="#0C121C"/>
	</svg>
	`
	const inlineSVG1 = `data:image/svg+xml;charset=utf-8,<svg width="19" height="19" viewBox="0 0 190 190" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 91C0 96 2 100 5 103L79 178C86 184 97 184 103 178L175 106C181 100 181 89 175 82L101 8C97 5 93 3 89 3H17C7 3 0 10 0 19V91ZM39 25C49 25 56 33 56 42 56 51 49 59 39 59 30 59 23 51 23 42 23 33 30 25 39 25Z" fill="firebrick"/></svg>`
	let inlineSVG2 = "<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><linearGradient id='gradient'><stop offset='10%' stop-color='#F00'/><stop offset='90%' stop-color='#fcc'/> </linearGradient><rect fill='url(#gradient)' x='0' y='0' width='100%' height='100%'/></svg>";
	let inlineSVG4 = `data:image/svg+xml;charset=utf-8,<svg width="19" height="19" viewBox="0 0 190 190" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 91C0 96 2 100 5 103L79 178C86 184 97 184 103 178L175 106C181 100 181 89 175 82L101 8C97 5 93 3 89 3H17C7 3 0 10 0 19V91ZM39 25C49 25 56 33 56 42 56 51 49 59 39 59 30 59 23 51 23 42 23 33 30 25 39 25Z" fill="firebrick"/></svg>`
	let inlineSVG5 = `<svg width="19" height="19" viewBox="0 0 190 190" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 91C0 96 2 100 5 103L79 178C86 184 97 184 103 178L175 106C181 100 181 89 175 82L101 8C97 5 93 3 89 3H17C7 3 0 10 0 19V91ZM39 25C49 25 56 33 56 42 56 51 49 59 39 59 30 59 23 51 23 42 23 33 30 25 39 25Z" fill="firebrick"/></svg>`
	let mySVG64 = window.btoa(inlineSVG3);

	const divStyle = {
		width: '24px',
		height: '24px',
		backgroundImage: "url('data:image/svg+xml;base64," + mySVG64 + "')",
	}

	const [svgData, setSvgData] = useState(null)
	const handleFetchData = async () => {
		const response = await fetch("test.svg");
		const data = await response.text();
		// let textSvg = await response.text();
		setSvgData(data)
		// console.log(svgData)
	}
	
	useEffect(() => {
		handleFetchData();
	},[])

	// const link = "csoft-icons.json"
	// const f = async(link) => {
	// 	try {
	// 		const res = await fetch(link)
	// 		if (!res.ok) {
	// 			console.error('Could not fetch. ', res.status)
	// 			return false
	// 		}
	// 		return await res.json()
	// 	} catch (error) {
	// 		console.error('Could not fetch. ', error.message)
	// 		return false
	// 	}
	// }
	// console.log(f);

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
								<>
									<h3>Файл #{iconInfo[0].data}</h3>
									<span className="font_ultra">обновлен</span>
									<b className={"font_ultra margin_left_ultra_small"} >{iconInfo[2].data}</b>
								</>
							}
							{iconImage && 
								<>
									<br/>
									<img className={"icon_container__image padding_top_bottom_m"} src={iconImage} alt={iconTitle} />
								</>
							}
						</section>
						
						<section>
							<div style={divStyle}></div>
							{svgData && <p>{svgData}</p>}
							{/* <img className={styles.test} src={`'data:image/svg+xml;charset=utf-8,${mySVG}'`} alt="" /> */}
							{svgData && 
							<>
								{console.log(inlineSVG2)}
								<img src={`data:image/svg+xml;charset=utf-8,${inlineSVG6}`}/>
							</>}
							<img src={`data:image/svg+xml;charset=utf-8,${inlineSVG5}`}/>
							{/* <img src='data:image/svg+xml;charset=utf-8,<svg width="19" height="19" viewBox="0 0 190 190" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 91C0 96 2 100 5 103L79 178C86 184 97 184 103 178L175 106C181 100 181 89 175 82L101 8C97 5 93 3 89 3H17C7 3 0 10 0 19V91ZM39 25C49 25 56 33 56 42 56 51 49 59 39 59 30 59 23 51 23 42 23 33 30 25 39 25Z" 
fill="firebrick"/></svg>'/> */}
							{iconTags && <IconTags iconTags={iconTags} />}
						</section>

					</div>

				</div>
			</div>
		</>
	)
}

export default IconPage