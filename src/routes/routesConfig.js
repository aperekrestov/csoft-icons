import IconPage from '@containers/IconPage'
import LegalPage from '@containers/LegalPage'
import NotFoundPage from '@containers/NotFoundPage'

const routesConfig = [
	{
		path: '/',
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