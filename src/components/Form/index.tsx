import { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';

import { Input } from '../Input/Index';

import { useClickOutSide } from '../../hooks/useClickOutSide';
import { addSchedule } from '../../utils/firebase';
import { ReactComponent as CalendarIcon } from '../../assets/image/calendar.svg'

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

export function Form({schedules}: SchedulesProps) {
    const [ inputHours, setInputHours ] = useState('')
    const [ inputMinutes, setInputMinutes ] = useState('')
    const [ inputHoursEnd, setInputHoursEnd ] = useState('')
    const [ inputMinutesEnd, setInputMinutesEnd ] = useState('')
    const [ error, setError ] = useState('')

    const [ date, setDate ] = useState(new Date());
    const [ openCalendar, setOpenCalendar ] = useState(false)

    const calendarRef = useRef<HTMLDivElement>(null)

    const { clickOutSide } = useClickOutSide()

    const getDatesFormated = () => {
        date.setHours(Number(inputHours))
        date.setMinutes(Number(inputMinutes))

        const dateEnd = new Date(date.toDateString())
        dateEnd.setHours(Number(inputHoursEnd))
        dateEnd.setMinutes(Number(inputMinutesEnd))
        
        const dateInMilliseconds = Date.parse(String(date))
        const dateEndIndMilliseconds = Date.parse(String(dateEnd))

        const timeEndIsCorrect = dateEndIndMilliseconds <=  dateInMilliseconds
        if ( timeEndIsCorrect ) {
            setError('Termino da agenda está errada')
            return
        }
       
        const sameDate = schedules?.some( ({key, schedule}: SchedulesType) => date.getDate() === new Date(schedule.date).getDate())

        if ( sameDate ) {
            const thereWorkThatDay = schedules?.some( ({key, schedule}: SchedulesType) => (dateInMilliseconds >= schedule.date && dateEndIndMilliseconds <= schedule.date_end) || (dateInMilliseconds <= schedule.date && dateEndIndMilliseconds >= schedule.date_end) )
            // valor >= date e valor <= dateEnd = job na mesma hora.
            // valor <= date e valor >= dateEnd = job na mesma hora.
            if (thereWorkThatDay) return setError('Há um conflito de datas-horas 0')

            const sameHoursBetweenJobs = schedules?.some( ({key, schedule}: SchedulesType) => (dateInMilliseconds <= schedule.date && dateEndIndMilliseconds >= schedule.date) || (dateInMilliseconds <= schedule.date_end && dateEndIndMilliseconds >= schedule.date_end) )
            if(sameHoursBetweenJobs) return setError('Há um conflito de datas-horas')
        }

        return { dateInMilliseconds, dateEndIndMilliseconds }
    }

    const cleanInputs = () => {
        setInputHours('')
            setInputHoursEnd('')
            setInputMinutes('')
            setInputMinutesEnd('')
    }

    const handleAddSchedule = async (e: any) => {
        e.preventDefault()

        if (!inputHours || !inputMinutes && !inputHoursEnd || !inputMinutesEnd ) {
            setError('Preencha todos os campos')
            return
        }

        if (error) return

       const dates = getDatesFormated()

        if (!dates?.dateEndIndMilliseconds) return

        try {
            addSchedule( dates.dateInMilliseconds, dates.dateEndIndMilliseconds )
            cleanInputs()
        } catch {
            setError('Não foi possivel fazer o registro')
        }
    }

    useEffect(() => {
        if(openCalendar) {
            clickOutSide({calendarRef, openCalendar, setOpenCalendar})
        }
    }, [openCalendar])

    return (
        <section className={styles.formContainer}>
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
                <div  className={styles.timeStart}>
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
                </div>
                <div className={styles.timeEnd}>
                    <span>Fim</span>
                    <div>
                        <Input 
                            className={styles.input}
                            setError={setError} 
                            placeholder="Hora" 
                            type="text" 
                            value={inputHoursEnd} 
                            setValue={setInputHoursEnd}
                        />
                        <Input  
                            className={styles.input}
                            setError={setError} 
                            placeholder="Minuto" 
                            type="text" 
                            value={inputMinutesEnd} 
                            setValue={setInputMinutesEnd}
                        />
                    </div>
                </div>
                    <button className={styles.btnAgendar}><CalendarIcon className={styles.iconCalendar}/> <span></span> Agendar</button>
            </form>
            { error && <p className="error">{error}</p>}
    </section>
    )
}