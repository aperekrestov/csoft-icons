import PropTypes from 'prop-types'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { withErrorApi } from '@hoc/withErrorApi'

import IconInfo from '@components/IconPage/IconInfo'
import IconImage from '@components/IconPage/IconImage'

import { getIconImage } from '@services/getIconData'

import { getIconResource } from '@utils/network'

import { JSON } from '@constants/icon'

import styles from './IconPage.module.css'

const IconPage = ({ setErrorApi }) => {
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
						setIconTags(res[index].tags)
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
	}, [])

	return (
		<>
			<div className="wrapper_grey_page">

			<div className="content_width_middle padding-h-large">
				{iconInfo && <IconInfo iconInfo={iconInfo} />}

				<IconImage 
					iconImage={iconImage}
					iconTitle={iconTitle}
				/>
			</div>
			</div>
		</>
	)
}

IconPage.propTypes = {
	setErrorApi: PropTypes.func
}

export default withErrorApi(IconPage)