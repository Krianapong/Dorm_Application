import React from "react"
import Back from "../common/Back"
import Calendar from "./Calendar"
import "../home/recent/recent.css"
import img from "../../images/about.jpg"

const CalendarCard = () => {
    return (
        <>
            <section className='blog-out mb'>
                <Back name='Calendar' title='Calendar - Our Calendar' cover={img} />
                <Calendar />
            </section>
        </>
    )
}

export default CalendarCard
