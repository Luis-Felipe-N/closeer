import { useEffect, useRef, useState } from 'react'

import Calendar from 'react-calendar';

import { Header } from '../../components/Header'
import { Input } from '../../components/Input/Index'
import { Status } from '../../components/Status'

import { ReactComponent as LogoIcon } from '../../assets/image/logo.svg'
import { ReactComponent as CalendarIcon } from '../../assets/image/calendar.svg'

import styles from './styles.module.scss'
import 'react-calendar/dist/Calendar.css';
import { useClickOutSide } from '../../hooks/useClickOutSide';
import { addSchedule, getSchedules } from '../../utils/firebase';
import { Schedules } from '../../components/Schedule';

interface ShedulesType {
    key: string,
    schedule: {
        date: string, created_at: string
    }
}

export function Home() {
    const [ inputHours, setInputHours ] = useState('')
    const [ inputMinutes, setInputMinutes ] = useState('')
    const [ error, setError ] = useState('')

    const [ openCalendar, setOpenCalendar ] = useState(false)

    const [ date, setDate ] = useState(new Date());
    const [ schedules, setSchedules ] = useState<ShedulesType[]>()

    const calendarRef = useRef<HTMLDivElement>(null)

    const { clickOutSide } = useClickOutSide()

    const handleAddSchedule = async (e: any) => {
        e.preventDefault()
        if (!inputHours || !inputMinutes ) {
            setError('Preencha todos os campos')
            return
        }

        if (error) return

        date.setHours(Number(inputHours))
        date.setMinutes(Number(inputMinutes))

        // if ( shedule)
        addSchedule( date )
    }

    useEffect(() => {
        getSchedules(setSchedules)
        console.log(schedules)
    }, [])

    useEffect(() => {
        console.log(schedules)
    }, [schedules])

    useEffect(() => {
        if(openCalendar) {
            clickOutSide({calendarRef, openCalendar, setOpenCalendar})
        }
    }, [openCalendar])

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

                        <section>
                            { openCalendar && (
                                <div ref={calendarRef} className={styles.calendar}>
                                    <Calendar 
                                        onChange={setDate}
                                        value={date}
                                        calendarType="US"
                                        prevLabel={null}
                                        prev2Label={null}
                                />
                                </div>
                                )}
                            <form className={styles.form} onSubmit={handleAddSchedule}>
                                <button onClick={() => setOpenCalendar(true)} type="button">Selecine uma data...</button>
                                <div>
                                    <Input 
                                        className={styles.input}
                                        setError={setError} 
                                        placeholder="Hora" 
                                        type="text" 
                                        value={inputHours} 
                                        setValue={setInputHours}
                                    />
                                    <Input  
                                        className={styles.input}
                                        setError={setError} 
                                        placeholder="Minuto" 
                                        type="text" 
                                        value={inputMinutes} 
                                        setValue={setInputMinutes}
                                    />
                                </div>
                                <button className={styles.btnAgendar}><CalendarIcon className={styles.iconCalendar}/> <span></span> Agendar</button>
                            </form>
                            { error && <p className="error">{error}</p>}
                        </section>
                        <section className={styles.schedule}>
                            <div className={styles.schedule__header}>
                                <ul>
                                    <Status status="future" />
                                    <Status status="started" />
                                    <Status status="next" />
                                </ul>
                            </div>
                            <div>
                                { schedules ? (
                                    schedules.map( ({ key, schedule }: ShedulesType) => <Schedules key={key} schedule={schedule} />)
                                    ) : 'Sem compromiso na agenda'
                                }
                            </div>
                        </section>
                    </div>
                </section>
            </main> 
        </div>
    )
}