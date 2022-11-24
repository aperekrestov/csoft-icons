import { useParams } from 'react-router'
import { useEffect, useState } from 'react'

import { withErrorApi } from '@hoc/withErrorApi'

import { URL, WAY, EXTENSION, GENERAL_SIZE } from '@constants/icon'

import { getIconResource } from '@utils/network'

import PropTypes from 'prop-types'

import styles from './IconPage.module.css'

const IconPage = ({ setErrorApi }) => {
	const clickedIdIcon = useParams().id

	const [iconTitle, setIconTitle] = useState(null)
	const [iconTags, setIconTags] = useState(null)
	const [iconCreatedDay, setIconCreatedDay] = useState(null)

	useEffect(() => {
		(async () => {
			const res = await getIconResource(URL)

			if (res) {
				for (let index = 0; index < res.length; index++) {
					if(res[index].id === clickedIdIcon){
						setIconTitle(res[index].title)
						setIconTags(res[index].tags)
						setIconCreatedDay(res[index].changed)
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
			<h1>{clickedIdIcon}</h1>
			<h2>{iconTitle}</h2>
			<p>{iconTags}</p>
			<u>{iconCreatedDay}</u>
		</>
	)
}

IconPage.propTypes = {
	setErrorApi: PropTypes.func
}

export default withErrorApi(IconPage)