import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import App from '@containers/App'
import { ScrollTop, IconArray } from './services/context'

import '@styles/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

function Main() {
	const [scrollTop, setScrollTop] = useState(0)
	const [iconArray, setIconArray] = useState(null)

	return (
		// <React.StrictMode>
			<ScrollTop.Provider value={{scrollTop, setScrollTop}}>
				<IconArray.Provider value={{iconArray, setIconArray}}>
					<App />
				</IconArray.Provider>
			</ScrollTop.Provider>
		// </React.StrictMode>
	)
}

root.render(
	<Main />
)

