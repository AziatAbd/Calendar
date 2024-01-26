import React, { useState } from "react";
import "./Calendar.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState();

  const daysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  };

  const startOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendar = () => {
    const totalDays = daysInMonth(currentDate);
    const startingDay = startOfMonth(currentDate);
    const calendar = [];

    let dayCount = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < startingDay) || dayCount > totalDays) {
          week.push(null);
        } else {
          week.push(dayCount);
          dayCount++;
        }
      }
      calendar.push(week);
    }

    return calendar;
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    setCurrentDate(nextMonth);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    console.log(
      `${currentDate.toLocaleString("default", {
        month: "long",
      })} ${day}, ${currentDate.getFullYear()}`
    );
  };

  return (
    <div>
      <h2>
        {currentDate.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </h2>
      <button className="prev-btn" onClick={handlePrevMonth}>
        Prev
      </button>
      <button className="next-btn" onClick={handleNextMonth}>
        Next
      </button>
      <table className="calendar">
        <thead>
          <tr>
            <th>Вс</th>
            <th>Пн</th>
            <th>Вт</th>
            <th>Ср</th>
            <th>Чт</th>
            <th>Пт</th>
            <th>Сб</th>
          </tr>
        </thead>
        <tbody>
          {generateCalendar().map((week, index) => (
            <tr key={index}>
              {week.map((day, index) => {
                const today = day === currentDate.getDate();

                return (
                  <td
                    key={index}
                    onClick={() => handleDayClick(day)}
                    className={`day ${today ? "today" : ""} ${
                      day === selectedDay ? "selected-day" : ""
                    }`}
                  >
                    {day !== null ? day : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
