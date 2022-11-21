import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'

import IconPage from '@containers/IconPage'
import LegalPage from '@containers/LegalPage'




import styles from './App.module.css'

const App = () => {
	return (
		<>
			<BrowserRouter>
				<NavLink to="/">Home</NavLink>
				<NavLink to="/legal">Legal</NavLink>

				<Routes>
					<Route path="/" element={<IconPage/>} />
					<Route path="/legal" element={<LegalPage/>} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
