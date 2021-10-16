import perfilImg from '../../assets/image/perfil.png'
import { ReactComponent as CheckedIcon } from '../../assets/image/checked.svg'
import { ReactComponent as LogoIcon } from '../../assets/image/logo-white.svg'

import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function Header() {
    const [ date, setDate ] = useState('')

    useEffect(() => {
        const currentDate = new Date()

        const dateFormated = format(currentDate, "d 'de' MMMM 'de' yyyy - kk':'mm", {locale: ptBR})
        setDate(dateFormated)
    }, [])

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContainer__top}>
            <LogoIcon className={styles.logo} />
            <p>Hoje - {date}</p>
            </div>

            <section className={styles.headerContainer__section}>
                <img className={styles.perfilImg} src={perfilImg} alt="foto de perfil do Yuji Itadori" />
                <div><h1>Yuji Itadori <CheckedIcon /> </h1>
                <span>Exorcista Jujutsu</span></div>
            </section>
        </header>
    )
}