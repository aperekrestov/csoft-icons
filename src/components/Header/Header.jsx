import { NavLink } from 'react-router-dom'

import styles from './Header.module.css'

const Header = () => {
	return (
		<section className={styles.wrapper}>
			<nav className={styles.container}>
				<NavLink to='/' className={styles.logo}></NavLink>

				<div className={styles.search}>
					<input className={styles.search__input} autoFocus type="text" autoComplete="off" placeholder="Поиск графических иконок" />
					<div className={styles.search__btn}></div>
				</div>

				<ul className={styles.list__btn}>
					<li><NavLink to='/legal' className={styles.list__btn_legal}></NavLink></li>
					<li><NavLink to='/' className={styles.list__btn_home}></NavLink></li>
				</ul>
			</nav>
		</section>
	)
}


export default Header
