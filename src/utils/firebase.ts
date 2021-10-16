import { v4 as uuidV4 }  from 'uuid'
import { db } from '../services/firebase'

import { ref, set, getDatabase, onValue } from "@firebase/database";

export const addSchedule = async ( date: Date ) => {
    console.log('adicionado agendamento')
    try {
        set(ref(db, 'users/' + 1 + '/schedule/' + uuidV4() ), {
            date: String(date),
            created_at: String(new Date())
          });
    } catch (e){
        console.log('nao adicionou ' + e)
    }
}

export const getSchedules = (setSchedules: any) => {

    const db = getDatabase();
    const starCountRef = ref(db, 'users/' + 1 + '/schedule/' );
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const dateFormated = Object.entries(data).map( (value: any) => {
            const key = value[0]
            const schedule = value[1]

            return {
                key,
                schedule
            }
        })
        setSchedules(dateFormated)
    });
}