import styles from './styles.module.scss'

interface StatusProps {
    status: string
}

export function Status({status}: StatusProps) {
    if ( status === 'future') {
        return (
            <div className={styles.statusFuture}>
                <span>Para o futuro</span>
            </div>
        )
    } else if ( status === 'started') {
        return (
            <div className={styles.statusStarted}>
                <span>Já iniciou</span>
            </div>
        )
    } else if ( status === 'next') {
        return (
            <div className={styles.statusNext}>
                <span>Próximo do início</span>
            </div>
        )
    } else return null
}