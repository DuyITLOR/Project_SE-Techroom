import React, { useState, useMemo } from 'react'
import ArrowRight from "../../assets/chevron-right.svg?react";
import ArrowLeft from "../../assets/chevron-left.svg?react";


export const TIME_SLOTS = {
    1: { start: "07:00", end: "09:00" },
    2: { start: "09:00", end: "11:00" },
    3: { start: "13:00", end: "15:00" },
    4: { start: "15:00", end: "17:00" },
    5: { start: "17:00", end: "19:00" },
};



export const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const TimetableGrid = ({ event = [], initialDate, onDateChange }) => {

    const init = initialDate ? new Date(initialDate) : new Date()
    const [selectedDate, setSelectedDate] = useState(
        new Date(init.getFullYear(), init.getMonth(), init.getDate())
    );

    const toISO = (d) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    };


    const HeaderOfTable = (day) => {
        const weekOfDay = WEEK_DAYS[day.getDay() === 0 ? 6 : day.getDay() - 1]
        const dayOfMonth = String(day.getDate()).padStart(2, '0');
        const mo = day.toLocaleString('en-GB', { month: 'short' })
        return `${weekOfDay}\n${dayOfMonth} ${mo}`; // e.g. "Mon 01 Jan 2023"
    }



    const slotKeys = Object.keys(TIME_SLOTS).map(Number);
    //   console.log("Slot Keys:", slotKeys);


    const addDays = (d, n) => {
        const nd = new Date(d);
        nd.setDate(nd.getDate() + n);
        return nd;
    };

    const getWeekStartMonday = (d) => {
        const day = d.getDay();            // 0=Sun..6=Sat
        const offset = day === 0 ? -6 : 1 - day; // đưa về Monday
        return addDays(d, offset);
    };

    const weekStart = useMemo(() => getWeekStartMonday(selectedDate), [selectedDate]);

    // Use when calculate the value
    const weekDays = useMemo(() => {
        return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
    }, [weekStart]);

    const findEvent = (day, slot) => {
        return event.find(e => e.date === day && e.slot === slot);
    }

    const handleNextWeek = () => {
        console.log("Next week clicked");
    }

    const handlePreviousWeek = () => {
        console.log("Previous week clicked");
    }

    const byDateAndSlot = (iso, slot) =>
        event.find(e => e.date === iso && e.slot === slot);

    const handlePickDate = (e) => {
        const val = e.target.value; // "YYYY-MM-DD"
        const [y, m, d] = val.split('-').map(Number);
        const nd = new Date(y, m - 1, d);
        setSelectedDate(nd);
        onDateChange?.(val);
    }

    return (
        <div className='w-full bg-gray-50 shadow-lg border border-gray-100 rounded-b-xs overflow-hidden'>

            {/* Nagivate */}
            <div className='flex items-center justify-between gap-3 p-3 border-b bg-white'>
                <div className='flex items-center gap-2'>
                    <button
                        onClick={handlePreviousWeek}
                        className='px-2 py-1 rounded hover:bg-gray-100'
                    ><ArrowLeft /></button>

                    <button
                        onClick={handleNextWeek}
                        className='px-2 py-1 rounded hover:bg-gray-100'
                    ><ArrowRight /></button>
                </div>


                <input
                    type="date"
                    value={toISO(selectedDate)}
                    onChange={handlePickDate}
                    className="border rounded px-2 py-1"
                />
            </div>


            {/* Header */}
            <div className='grid grid-cols-8 border-b bg-white'>
                {/* display time  */}
                <div className='px-3 py-3 text-sm font-medium text-gray-500'>
                    Time
                </div>

                {weekDays.map((d) => (
                    <div key={toISO(d)} className="px-3 py-3 text-sm font-semibold whitespace-pre-line">
                        {HeaderOfTable(d)}
                    </div>
                ))}
            </div>

            {/* Body */}
            <div>
                {slotKeys.map((slot) => {
                    const { start, end } = TIME_SLOTS[slot];
                    return (
                        <div>
                            <div key={slot} className='grid grid-cols-8 border-b min-h-[100px]'>
                                <div className='px-3 py-4 text-sm text-gray-500 whitespace-nowra'>
                                    {start} - {end}
                                </div>

                                {
                                    weekDays.map((day) => {
                                        const iso = toISO(day)
                                        const event = findEvent(iso, slot)
                                        return (
                                            <div key={`${iso}-${slot}`} className="relative border-l">
                                                {
                                                    event && (
                                                        <div className="absolute inset-2 rounded-lg bg-red-200/80 p-2">
                                                            <div className="text-[13px] font-semibold">{event.classID}</div>
                                                            <div className="text-[12px]">{start} - {end}</div>
                                                            <div className="text-[12px] text-gray-700">
                                                                {event.roomName ? `Room: ${event.roomName}` : null}
                                                                {event.lecturer ? (event.roomName ? " • " : "") + event.lecturer : null}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    })
                                }


                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TimetableGrid