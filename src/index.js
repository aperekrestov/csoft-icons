import ReactDOM from 'react-dom/client'
import App from './App'
// import { IconArray } from './context/context'

import '@styles/index.css'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))

function Main() {
	// const [iconArray, setIconArray] = useState(null)

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