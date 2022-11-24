import IconsPage from '@containers/IconsPage'
import IconPage from '@containers/IconPage'
import LegalPage from '@containers/LegalPage'
import NotFoundPage from '@containers/NotFoundPage'

const routesConfig = [
	{
		path: '/',
		element: <IconsPage/>
	},
	{
		path: '/icon-:id',
		element: <IconPage/>
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