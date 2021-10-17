import { useEffect, useState } from "react"
import { Status } from "../Status"
import { format } from "date-fns"
import { ptBR } from 'date-fns/locale'

import styles from './styles.module.scss'

interface ShedulesType {
    key: string,
    schedule: {
        date: number,
        date_end: number,
        created_at: number
    }
}

export function Schedules({schedule}: ShedulesType) {
    const [ status, setStatus ] = useState('')

    useEffect(() => {
        const sheduleDate = schedule.date
        const currentDate = new Date()
        const timeLeft = sheduleDate - Date.parse(String(currentDate))
        
        if ( timeLeft <= 0 ) {
            setStatus('started')
            return
        } else if (timeLeft <= 43200000) { // 43200000 === 12h
            setStatus('next')
            return
        } else {
            setStatus('future')
        }
    }, [])  

    return (
        <li className={styles.scheduleContainer}>
            <Status status={status }/>
            {format(schedule.date, "d'/'MMM 'das' kk'h'mm 'ás'", {locale: ptBR})}
            {format(schedule.date_end, " kk'h'mm", {locale: ptBR})}
        </li>
    )
}