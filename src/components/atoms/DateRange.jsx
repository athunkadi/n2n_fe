import { useEffect, useRef, useState } from 'react'
import { DateRangePicker as CompDateRangePicker, DateRange as CompDateRange } from 'react-date-range'

import format from 'date-fns/format'
import { addDays } from 'date-fns'

import { LuCalendarDays } from "react-icons/lu";

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { useSelector } from 'react-redux'

const DateRange = ({ className }) => {
  const { dimensionScreenW } = useSelector(state => state.global);
  // date state
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 30),
      key: 'selection'
    }
  ])

  // open close
  const [open, setOpen] = useState(false)

  // get the target element to toggle 
  const refOne = useRef(null)

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false)
    }
  }

  // Hide dropdown on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false)
    }
  }

  return (
    <div className={`calendarWrap ${className}`}>

      <LuCalendarDays className='absolute left-3 top-2' />
      <input
        value={`${format(range[0].startDate, "dd/MM/yyyy")} to ${format(range[0].endDate, "dd/MM/yyyy")}`}
        readOnly
        className="input input-sm input-bordered rounded-[25px] w-[12.5rem] text-end text-xs bg-transparent"
        onClick={() => setOpen(open => !open)}
        disabled
      />

      <div ref={refOne}>
        {open && (
          dimensionScreenW > 640 ? (
            <>
              <CompDateRangePicker
                onChange={item => setRange([item.selection])}
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                ranges={range}
                months={2}
                direction="horizontal"
              />
            </>
          ) : (
            <>
              <CompDateRange
                onChange={item => setRange([item.selection])}
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                ranges={range}
                className='rdrCalendarWrapperC rdrDateRangeWrapperC'
              />
            </>
          )
        )

        }
      </div>

    </div>
  )
}

export default DateRange