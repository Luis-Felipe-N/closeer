import { useEffect, useState } from "react"
import { Status } from "../Status"

interface ShedulesType {
    key: string,
    schedule: {
        date: string, created_at: string
    }
}

export function Schedules({schedule}: ShedulesType) {
    const [ status, setStatus ] = useState('')

    useEffect(() => {
        const sheduleDate = schedule.date
        const currentDate = new Date()
        const timeLeft = Date.parse(sheduleDate) - Date.parse(String(currentDate))
        
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
        <li>
            <Status status={status }/>
            {schedule.date}
        </li>
    )
}