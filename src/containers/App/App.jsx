import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routesConfig from '@routes/routesConfig'
import styles from './App.module.css'

const App = () => {
	return (
		<>
			<BrowserRouter>
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
