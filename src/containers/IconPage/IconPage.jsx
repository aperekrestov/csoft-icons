import { useContext } from 'react'
import { useParams } from 'react-router'

import Header from '@components/Header'
import TheIcon from '@components/IconPage/TheIcon'
import IconLinkBack from '@components/IconPage/IconLinkBack'
import IconTags from '@components/IconPage/IconTags'
import { getIconImage } from '@services/getIconData'
import { getIconTags } from '@services/getIconData'
import { IconArray } from '@services/context'

import cn from "classnames"
import styles from './IconPage.module.css'

const IconPage = () => {
	window.scrollTo(0, 0)

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

			<div className={cn("content_width_middle padding_top_bottom_l")}>
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
						<TheIcon iconImage={iconImage} iconTitle={iconTitle} />
					</section>
					
					<section>
						{iconTags && <IconTags iconTags={iconTags} />}
					</section>
				</div>

			</div>
			</div>
		</>
	)
}

export default IconPage