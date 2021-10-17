import { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';

import { Input } from '../Input/Index';

import { useClickOutSide } from '../../hooks/useClickOutSide';
import { addSchedule } from '../../utils/firebase';
import { ReactComponent as CalendarIcon } from '../../assets/image/calendar.svg'

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
    const [ dateBtn, setDateBtn ] = useState(false)

    const [ date, setDate ] = useState(new Date());
    const [ openCalendar, setOpenCalendar ] = useState(false)

    const calendarRef = useRef<HTMLDivElement>(null)

    const { clickOutSide } = useClickOutSide()

    const validateDate = (dateInMilliseconds: number, dateEndIndMilliseconds: number) => {
        const timeEndIsCorrect = dateEndIndMilliseconds <=  dateInMilliseconds
        if ( timeEndIsCorrect ) {
            setError('Termino da agenda está errada')
            return false
        }
       
        const sameDate = schedules?.some( ({key, schedule}: SchedulesType) => date.getDate() === new Date(schedule.date).getDate())

        if ( sameDate ) {
            const thereWorkThatDay = schedules?.some( ({key, schedule}: SchedulesType) => (dateInMilliseconds >= schedule.date && dateEndIndMilliseconds <= schedule.date_end) || (dateInMilliseconds <= schedule.date && dateEndIndMilliseconds >= schedule.date_end) )
            // valor >= date e valor <= dateEnd = job na mesma hora.
            // valor <= date e valor >= dateEnd = job na mesma hora.
            if (thereWorkThatDay) {
                setError('Há um conflito de datas-horas 0')
                return false
            }

            const sameHoursBetweenJobs = schedules?.some( ({key, schedule}: SchedulesType) => (dateInMilliseconds <= schedule.date && dateEndIndMilliseconds >= schedule.date) || (dateInMilliseconds <= schedule.date_end && dateEndIndMilliseconds >= schedule.date_end) )
            if(sameHoursBetweenJobs) {
                setError('Há um conflito de datas-horas')
                return false
            }
        }

        return true

    }

    const getDatesFormated = () => {
        date.setHours(Number(inputHours))
        date.setMinutes(Number(inputMinutes))

        const dateEnd = new Date(date.toDateString())
        dateEnd.setHours(Number(inputHoursEnd))
        dateEnd.setMinutes(Number(inputMinutesEnd))
        
        const dateInMilliseconds = Date.parse(String(date))
        const dateEndIndMilliseconds = Date.parse(String(dateEnd))

        validateDate(dateInMilliseconds, dateEndIndMilliseconds)
        if(!validateDate(dateInMilliseconds, dateEndIndMilliseconds)) return
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

        if (!inputHours || !inputMinutes || !inputHoursEnd || !inputMinutesEnd ) {
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
    }, [openCalendar, clickOutSide])
    return (
        <>
        <section className={styles.formContainer}>
            { openCalendar && (
                <div onClick={() => setDateBtn(true)} ref={calendarRef} className={styles.calendarContainer}>
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
                    { dateBtn ? (
                        <button onClick={() => setOpenCalendar(!openCalendar)} type="button">{format(date, "d'/'MMMM", {locale: ptBR})}</button>
                    ) : (
                        <button onClick={() => setOpenCalendar(!openCalendar)} type="button">Selecione uma data...</button>
                    )}
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
    </>
    )
}