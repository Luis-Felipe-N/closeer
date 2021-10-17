import { useEffect, useState } from 'react'

import { Header } from '../../components/Header'

import { ReactComponent as LogoIcon } from '../../assets/image/logo.svg'

import styles from './styles.module.scss'
import 'react-calendar/dist/Calendar.css';
import { getSchedules } from '../../utils/firebase';
import { Form } from '../../components/Form'
import { ScheduleList } from '../../components/SchedulesList'

import dataUser from '../../db.json'

interface SchedulesType {
    key: string,
    schedule: {
        date: number,
        date_end: number,
        created_at: number
    }
}
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

export function Home() {
    const [ schedules, setSchedules ] = useState<SchedulesType[]>()
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


    useEffect(() => {
        getSchedules(setSchedules)
    }, [])

    return (
        <div className={styles.homeContainer}>
            <Header /> 
            <main className={styles.homeContainer__main}>
                <div className={styles.header}>
                    <LogoIcon className={styles.logo}/>
                </div>
                <section className={styles.section}>
                    <div>
                        <h1>Bem-vindo(a), {dataUser.data.fisrt_name}</h1>
                        <h3>Adicione seus jobs a agenda e gerencie sua rotina</h3>

                        <Form schedules={schedules} />
                        <ScheduleList schedules={schedules} />
                    </div>
                </section>
            </main> 
        </div>
    )
}