import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import App from '@containers/App'
import {ScrollTop} from './services/context'

import '@styles/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

function Main() {
	const [scrollTop, setScrollTop] = useState(0)

	return (
		<React.StrictMode>
			<ScrollTop.Provider value={{scrollTop, setScrollTop}}>
				<App />
			</ScrollTop.Provider>
		</React.StrictMode>
	)
}

root.render(
	<Main />
)

