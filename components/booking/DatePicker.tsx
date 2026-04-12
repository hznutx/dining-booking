'use client'

import { Calendar } from '@heroui/react'
import type { DateValue } from '@internationalized/date'
import {
  getLocalTimeZone,
  parseDate,
  startOfMonth,
  startOfWeek,
  today,
} from '@internationalized/date'

interface IDatePickerState {
  date: DateValue | null
  onChange?: ((value: DateValue) => void) | undefined
}

export const DatePicker: React.FC<IDatePickerState> = ({ date, onChange }) => {
  return (
    <Calendar
      aria-label="booking-date"
      onChange={onChange}
      defaultFocusedValue={today(getLocalTimeZone()) as DateValue}
      focusedValue={date}
      onFocusChange={onChange}
    >
      <Calendar.Header>
        <Calendar.YearPickerTrigger>
          <Calendar.YearPickerTriggerHeading />
          <Calendar.YearPickerTriggerIndicator />
        </Calendar.YearPickerTrigger>
        <Calendar.NavButton slot="previous" />
        <Calendar.NavButton slot="next" />
      </Calendar.Header>
      <Calendar.Grid>
        <Calendar.GridHeader>
          {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
        </Calendar.GridHeader>
        <Calendar.GridBody>
          {(date) => <Calendar.Cell date={date} />}
        </Calendar.GridBody>
      </Calendar.Grid>
      <Calendar.YearPickerGrid>
        <Calendar.YearPickerGridBody>
          {({ year }) => <Calendar.YearPickerCell year={year} />}
        </Calendar.YearPickerGridBody>
      </Calendar.YearPickerGrid>
    </Calendar>
  )
}
