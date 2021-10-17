import { useEffect, useState } from 'react'

import { Header } from '../../components/Header'

import { ReactComponent as LogoIcon } from '../../assets/image/logo.svg'

import styles from './styles.module.scss'
import 'react-calendar/dist/Calendar.css';
import { getSchedules } from '../../utils/firebase';
import { Form } from '../../components/Form'
import { ScheduleList } from '../../components/SchedulesList'

interface SchedulesType {
    key: string,
    schedule: {
        date: number,
        date_end: number,
        created_at: number
    }
}

export function Home() {
    const [ schedules, setSchedules ] = useState<SchedulesType[]>()

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
                        <h1>Bem-vindo(a), Yuji</h1>
                        <h3>Adicione seus jobs a agenda e gerencie sua rotina</h3>

                        <Form schedules={schedules} />
                        <ScheduleList schedules={schedules} />
                    </div>
                </section>
            </main> 
        </div>
    )
}