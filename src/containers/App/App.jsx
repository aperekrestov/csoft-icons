import cn from 'classnames'
import styles from './App.module.css'

import { getIconsResource } from '../../utils/network'

getIconsResource()

const App = () => {
	return (
		<h1 className={cn(styles.header)}>Привет</h1>
	)
}

export default App;
