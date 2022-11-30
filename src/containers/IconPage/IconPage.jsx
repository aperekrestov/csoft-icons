import PropTypes from 'prop-types'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import cn from "classnames"

import { withErrorApi } from '@hoc/withErrorApi'
import Header from '@components/Header'
import TheIcon from '@components/IconPage/TheIcon'
import IconLinkBack from '@components/IconPage/IconLinkBack'
import IconInfo from '@components/IconPage/IconInfo'
import IconTags from '@components/IconPage/IconTags'
import { getIconImage } from '@services/getIconData'
import { getIconTags } from '@services/getIconData'
import { getIconResource } from '@utils/network'
import { JSON } from '@constants/constants'

import styles from './IconPage.module.css'

const IconPage = ({setErrorApi}) => {
	const clickedIdIcon = useParams().id
	const [iconTitle, setIconTitle] = useState(null)
	const [iconImage, setIconImage] = useState(null)
	const [iconInfo, setIconInfo] = useState(null)
	const [iconTags, setIconTags] = useState(null)

	useEffect(() => {
		(async () => {
			const res = await getIconResource(JSON)
			
			if (res) {
				for (let index = 0; index < res.length; index++) {
					if(res[index].id === clickedIdIcon){
						setIconTitle(res[index].title)
						setIconTags(getIconTags(res[index].tags))
						setIconImage(getIconImage(clickedIdIcon))
						setIconInfo([
							{ title: 'Id', data: res[index].id },
							{ title: 'Title', data: res[index].title },
							{ title: 'Modificated', data: res[index].modificated },
						])
						return
					}
				}
				setErrorApi(false)
			} else {
				setErrorApi(true)
			}
		})()

		window.scrollTo(0, 0)
	}, [])

	

	return (
		<>
			<div className="wrapper_grey_page">
			<Header searchText={""}/>

			<div className={cn("content_width_middle padding_top_bottom_l")}>
				<IconLinkBack />

				<div className={styles.icon_page_flex}>
					
					<section className={styles.container_info}>
						{iconInfo && <IconInfo iconInfo={iconInfo} />}
						<TheIcon 
							iconImage={iconImage}
							iconTitle={iconTitle}
							/>
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

IconPage.propTypes = {
	setErrorApi: PropTypes.func
}

export default withErrorApi(IconPage)