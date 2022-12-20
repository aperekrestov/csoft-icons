import IconsPage from '@pages/IconsPage'
import IconPage from '@pages/IconPage'
import LegalPage from '@pages/LegalPage'
import NotFoundPage from '@pages/NotFoundPage'
import SearchPage from '@pages/SearchPage/SearchPage'


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
		// todo создать переадресацию по /search=Ð¿Ð¿Ð¿
		path: '/search=:id',
		element: <SearchPage/>
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