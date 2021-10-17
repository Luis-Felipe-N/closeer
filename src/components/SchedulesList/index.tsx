import { useEffect, useState } from 'react'
import { Schedules } from '../Schedule'
import { Status }  from '../Status'
import styles from './styles.module.scss'

interface SchedulesType {
    key: string,
    schedule: {
        date: number,
        date_end: number
        created_at: number
    }
}

interface SchedulesProps {
    schedules: SchedulesType[] | undefined
}

export function ScheduleList({schedules}: SchedulesProps) {
    const [ orderedSchedule , setOrderedSchedule ] = useState<SchedulesType[]>()

    useEffect(() => {
        if (schedules) {
            schedules.sort((a, b) => {
                return a.schedule.date - b.schedule.date
            })
            setOrderedSchedule(schedules)
            filterByYear()
        }
    }, [schedules, filterByYear])

    const filterByYear = () => {
        const scheduleFilter = orderedSchedule?.filter( ({ key, schedule }: SchedulesType ) => {
            const year = new Date(schedule.date).getFullYear()
            const currentYear = new Date().getFullYear()
            if( year === currentYear) {
                return true
            } else return false
        } )

        setOrderedSchedule(scheduleFilter)
    }

    return (
        <section className={styles.schedulesContainer}>
            <div className={styles.schedulesContainer__header}>
                <ul>
                    <Status status="future" />
                    <Status status="started" />
                    <Status status="next" />
                </ul>
            </div>
            <div className={styles.schedulesContainer__main}>
                { orderedSchedule?.length ? (
                    orderedSchedule.map( ({ key, schedule }: SchedulesType) => <Schedules key={key} schedule={schedule} />)
                    ) : <h2>Sem compromiso na agenda</h2>
                }
            </div>
        </section>
    )
}
// 