import { useEffect, useState } from 'react'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { formatDate } from '../../utils/formatDate'

import { ReactComponent as CheckedIcon } from '../../assets/image/checked.svg'
import { ReactComponent as LogoIcon } from '../../assets/image/logo-white.svg'
import { ReactComponent as ClockIcon } from '../../assets/image/clock.svg'

import styles from './styles.module.scss'

import dataUser from '../../db.json'

interface User {
    fisrt_name: string
    last_name: string
    picture: string
    height: number
    size: string
    shoe: number
    role: string
    created_at: string
}
// import db from '../../db.json'

export function Header() {
    const [ user, setUser ] = useState<User>()

    // useEffect(() => {
    //     const getDataUser = async () => {
    //         const response = await fetch('http://localhost:3000/data')
    //         const responseJson = await response.json()
    //         setUser(responseJson)
    //     }
    //     getDataUser()
    // }, [])

    useEffect(() => {
        setUser(dataUser.data)
    }, [])

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContainer__top}>
            <LogoIcon className={styles.logo} />
            <p className={styles.dateWeb}>Hoje - {format(new Date(), "d 'de' MMMM 'de' yyyy - kk':'mm", {locale: ptBR})}</p>
            <p className={styles.dateMobile}>{format(new Date(), "d 'de' MMM yyyy - kk'h'mm", {locale: ptBR})}</p>
            </div>

            { user && (
                <>
                    <section className={styles.headerContainer__section}>
                    <div title={`Imagem do ${user.fisrt_name}`} style={{backgroundImage: `url(${user.picture})`}} className={styles.perfilImg}> </div>
                    <div className={styles.name}>
                        <h1>{user.fisrt_name} {user.last_name} <CheckedIcon /> </h1>
                        <span>{user.role}</span>
                    </div>
                    <div className={styles.info}>
                        <div><span>Altura: </span> <span>{user.height / 100}</span></div>
                        <div><span>Manequim: </span> <span>{user.size}</span></div>
                        <div><span>Calçado: </span> <span>{user.shoe}</span></div>
                    </div>
                    <p className={styles.time_closeer}><ClockIcon/>Tempo na Closeer: {formatDate(user.created_at)}</p>
                </section>
            </>
            )}
        </header>
    )
}