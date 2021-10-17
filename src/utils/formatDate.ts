export function formatDate(date: string) { 
    const currentDate = new Date()
    const created_at = new Date(date)
    
    const year = currentDate.getFullYear() - created_at.getFullYear()
    const month = currentDate.getMonth() - created_at.getMonth()
    if ( year > 0 ) {
        return `${year}.${month} anos`
    } else {
        return `${month} mês`
    }

    // if ( timeFormated.getYear() > 1)
    //     return `${timeFormated.getYear() - 1} anos`
    // else if ( timeFormated.getDate() > 1 ) {
    //     return `${timeFormated.getDate() - 1} dias`
    // } else if ( timeFormated.getHours() > 0 ) {
    //     return `${timeFormated.getHours()} horas`
    // } else if ( timeFormated.getMinutes() > 0 ) {
    //     return `${timeFormated.getMinutes() } minutos`
    // } else {
    //     return `${timeFormated.getSeconds()} segundos`
    // }
}