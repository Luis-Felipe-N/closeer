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

export function ScheduleList(props: SchedulesProps) {
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
                { props.schedules?.length ? (
                    props.schedules.map( ({ key, schedule }: SchedulesType) => <Schedules key={key} schedule={schedule} />)
                    ) : <h2>Sem compromiso na agenda</h2>
                }
            </div>
        </section>
    )
}