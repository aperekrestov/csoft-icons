import IconsPage from '@containers/IconsPage'
import IconPage from '@containers/IconPage'
import LegalPage from '@containers/LegalPage'
import NotFoundPage from '@containers/NotFoundPage'
import SearchPage from '@containers/SearchPage/SearchPage'
import { REPOSITORY_NAME } from '@constants/constants'


const routesConfig = [
	{
		path: '/',
		element: <IconsPage/>
	},
	{
		path: 'csoft-icons/',
		element: <IconsPage/>
	},
	{
		path: '/icon-:id',
		element: <IconPage/>
	},
	{
		path: '/search=:id',
		element: <SearchPage/>
		// создать переадресацию по /search=
	},
	{
		path: '/legal',
		element: <LegalPage/>
	},
	{
		path: '*',
		element: <NotFoundPage/>
	},
]

export default routesConfig