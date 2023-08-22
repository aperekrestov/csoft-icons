import { useNavigate, NavLink } from "react-router-dom"
import iconBack from "./img/icon-0181-s.svg"
import cn from "classnames"
import styles from './IconLinkBack.module.css'

const IconLinkBack = ({iconIndex}) => {
	console.log(iconIndex);
	// const navigate = useNavigate()
	return (
		// todo получить номер иконки и передовать номер обратно дляпрямой ссылке на загрузку массива иконок до конкретной иконки
		<NavLink 
			// onClick={() => (navigate(-1))} 
			to={'/'}
			state={{indexNumber: iconIndex}}
			className={cn("font_light", styles.btn_back)}
		>
			<img src={iconBack} alt="Назад" className={cn(styles.btn_back__icon)} />
			<span className="font_small">Назад</span>
		</NavLink>
	)
}
export default IconLinkBack
