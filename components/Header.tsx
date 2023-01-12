import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import classes from '../styles/header.module.css'

const Header = () => {
    const router = useRouter()
    
    return (
        <header className={classes.header}>
            <div className="container">
                <div className={classes.header__wrap}>
                    <Link href={'/'} className={classes.header__title}>Фин. анализ</Link>
                    <div className={classes.header__links}>
                        <Link className={classes.header__link} href={'/'}>Главная</Link>
                        <Link className={classes.header__link} href={'/goals'}>Цели</Link>
                    </div>
                </div>
                
            </div>
        </header>
    )
}
export default Header