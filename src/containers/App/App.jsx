import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'

import routesConfig from '@routes/routesConfig'

import styles from './App.module.css'

const App = () => {
	return (
		<>
			<BrowserRouter>
				<NavLink to='/'>Home</NavLink>
				<NavLink to='/legal'>Legal</NavLink>

				<Routes>
					{routesConfig.map((route, index) => (
						<Route
							key={index}
							path={route.path}
							element={route.element}
						/>
					))}
				</Routes>

			</BrowserRouter>
		</>
	)
}

export default App
