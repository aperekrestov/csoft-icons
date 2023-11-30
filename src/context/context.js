import { createContext, useState } from 'react'

const Context = createContext()

function Provider(props) {
	const [iconArrayDefault, setIconArrayDefault] = useState([])
	const [loader, setLoader] = useState(0)

	let num = 0

	const loaderUpdate = (n) => {
		console.log(`loader update ${n}`)
		num+=n
		setLoader(num)
		console.log(`${num} - значение в контексте`)
	}

	const iconArrayUpdate = (arr) => {
		// console.log(arr)
		setIconArrayDefault(arr)
	}

	const value = {
		iconArrayDefault,
		iconArrayUpdate,
		loader,
		loaderUpdate
	}

	return (
		<Context.Provider value={value}>
			{props.children}
		</Context.Provider>
	)
}

export { Provider }
export default Context


// import React from 'react'

// export const IconArray = React.createContext(null)