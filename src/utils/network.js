const ICONS = './csoft-icons.json'


export const getIconsResource = () => {
	fetch(ICONS)
		.then(res => res.json())
		.then(body => console.log(body))
		.catch(error => console.log(error))
}
