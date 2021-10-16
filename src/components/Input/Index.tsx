import styles from './styles.module.scss'

interface InputProps {
    type: string,
    value: string,
    setValue: (value: string) => void,
    setError: (erro: string) => void,
    placeholder: string,
    className?: any

}

export function Input({value, setValue, setError, ...props}: InputProps) {

    const validar = () => {
        // if (!value) return setError('Preencha todos os campos')
        if (isNaN(Number(value))) return setError('Somente números')
        setError('')
    }

    return (
        <input
            value={value} 
            onChange={({target}) => setValue(target.value)} 
            onBlur={validar}
            {...props} 
        />
    )
}