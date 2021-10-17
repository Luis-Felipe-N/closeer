interface  ClickOutside {
    calendarRef: any,
    openCalendar: boolean,
    setOpenCalendar: any
}

export function useClickOutSide() {
    const clickOutSide = ( {calendarRef, openCalendar, setOpenCalendar}: ClickOutside ) => {
        document.addEventListener('click', handleClickOutSide)

        function handleClickOutSide( event: any ) {
            if (!calendarRef?.current.contains(event.target)) {
                setOpenCalendar(!openCalendar)
                document.removeEventListener('click', handleClickOutSide)
            }
        }
    }

    return { clickOutSide }
}