import { useEffect } from 'react'
import Header from '@components/Header'
import Footer from '@components/Footer'
import IconLinkBack from '@components/IconLinkBack'

import cn from 'classnames'
import styles from './InstructionPage.module.css'

const InstructionPage = () => {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<div className={cn(styles.bg_page_img, "wrapper bg_page")}>
			<Header searchText={""} />

			<div className="content_width_middle padding_top_bottom_l content_height_auto">
				<h2>Рекомендации разработчику</h2>
				<p>Придерживайтесь простых инструкций, изложенных ниже.</p>
				<h3>1. Не изменяйте размер иконки, растягивая ее</h3>
				<dl>
					<dt>В коллекции представлены уникальные между размерами файлы одной и тойже иконки:</dt>
					<dd>16x16 px</dd>
					<dd>24x24 px</dd>
					<dd>32x32 px</dd>
				</dl>
				<p>
					Данные размеры графических файлов создавались индивидуально. Линии контура толщиной 1 пиксель сохраняются в каждом из перечисленных форматов. Важно использовать оригинальный размер иконок, не изменяя масштаб по ширине или высоте.
					В противном случае Вы можете получить файлы иконок, линии которых не будут равны целым пикселям и будут отображаться на мониторе пользователя с искажениями и выглядеть размытыми, особенно в растровом формате.
				</p>

				<h3>2. По возможности используйте векторный вормат</h3>
				<dl>
					<dt>На сайте представленна возможнасть загрузить файл в двух форматах:</dt>
					<dd>SVG — векторный</dd>
					<dd>PNG — растровый</dd>
				</dl>
				<p>
					Основным форматом, в котором создавалась коллекция иконок, является векторный. Векторный формат качественно отображается на всех типах современных дисплеев. Особенно на дисплеях с высокой плотностью пикселей.
				</p>

				<p>
					Соблюдайте эти небольшие рекомендации и Вы будете иметь всегда отличный результат.
				</p>

				<div className="margin_bottom_xl">
					<IconLinkBack />
				</div>
			</div>

			<Footer />
		</div>
	)
}

export default InstructionPage
