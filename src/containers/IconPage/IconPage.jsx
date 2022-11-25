import PropTypes from 'prop-types'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { withErrorApi } from '@hoc/withErrorApi'

import IconInfo from '@components/IconPage/IconInfo'

import { getIconImage } from '@services/getIconData'

import { getIconResource } from '@utils/network'

import { JSON } from '@constants/icon'

import styles from './IconPage.module.css'

const IconPage = ({ setErrorApi }) => {
	const clickedIdIcon = useParams().id

	const [iconImage, setIconImage] = useState(null)
	const [iconTitle, setIconTitle] = useState(null)
	const [iconInfo, setIconInfo] = useState(null)
	const [iconTags, setIconTags] = useState(null)
	const [iconCreatedDay, setIconCreatedDay] = useState(null)

	useEffect(() => {
		(async () => {
			const res = await getIconResource(JSON)

			if (res) {
				for (let index = 0; index < res.length; index++) {
					if(res[index].id === clickedIdIcon){
						setIconTitle(res[index].title)
						setIconTags(res[index].tags)
						setIconCreatedDay(res[index].modificated)
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
			{iconInfo && (
				<IconInfo iconInfo={iconInfo}/>
			)}

			<div className="icon_container">
				<img className="icon_container__image" src={iconImage} alt={iconTitle} />
			</div>

			<p>{iconImage}</p>


			{/* <h1>{clickedIdIcon}</h1>
			<h2>{iconTitle}</h2>
			<p>{iconTags}</p>
			<u>{iconCreatedDay}</u> */}
		</>
	)
}

IconPage.propTypes = {
	setErrorApi: PropTypes.func
}

export default withErrorApi(IconPage)