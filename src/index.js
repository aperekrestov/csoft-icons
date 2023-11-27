import ReactDOM from 'react-dom/client'
import App from './App'

import '@styles/index.css'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))

function Main() {
	return (
		// <React.StrictMode>
				<BrowserRouter>
					<App />
				</BrowserRouter>
		// </React.StrictMode>
	)
}

root.render(
	<Main />
)