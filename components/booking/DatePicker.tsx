'use client'

import { IDeal } from '@/types/deal'
import { supabase } from '@/utils/supabase/client'
import { Calendar } from '@heroui/react'
import type { CalendarDate, DateValue } from '@internationalized/date'
import { getLocalTimeZone, isToday, today } from '@internationalized/date'
import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import { I18nProvider } from 'react-aria-components'

interface IDatePickerState {
  date: DateValue | null
  data?: IDeal
  onChange?: ((value: DateValue) => void) | undefined
}

export const DatePicker: React.FC<IDatePickerState> = ({
  date,
  data: deal,
  onChange,
}) => {
  const locale = useLocale()
  const now = today(getLocalTimeZone())

  const minDate = now
  const maxDate = now.add({ years: 1 })

  const isDateUnavailable = (date: DateValue) =>
    date < minDate || date > maxDate

  const isMatchEvent = (date: CalendarDate) =>
    [2, 3, 15, 16, 20].includes(date.day)
  const isFullyBooked = (date: CalendarDate) => [15, 20].includes(date.day)

  return (
    <I18nProvider locale={locale}>
      <Calendar
        style={{ width: '100%' }}
        aria-label="booking-date"
        value={date}
        onChange={onChange}
        minValue={minDate}
        maxValue={maxDate}
        defaultFocusedValue={minDate}
        isDateUnavailable={isDateUnavailable}
      >
        <Calendar.Header>
          <Calendar.YearPickerTrigger
            style={{ transform: 'none' }}
            aria-label="booking-year"
          >
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
            {(date) => (
              <Calendar.Cell date={date} style={{ textDecoration: 'none' }}>
                {({ formattedDate }) => (
                  <>
                    {formattedDate}
                    {isMatchEvent(date) && (
                      <Calendar.CellIndicator
                        style={{
                          backgroundColor: isFullyBooked(date)
                            ? '#EF4444'
                            : '#22C55E',
                        }}
                      />
                    )}
                  </>
                )}
              </Calendar.Cell>
            )}
          </Calendar.GridBody>
        </Calendar.Grid>

        <Calendar.YearPickerGrid>
          <Calendar.YearPickerGridBody>
            {({ year }) => (
              <Calendar.YearPickerCell
                style={{ margin: 2 }}
                isDisabled={year < minDate.year || year > maxDate.year}
                year={year}
              />
            )}
          </Calendar.YearPickerGridBody>
        </Calendar.YearPickerGrid>
      </Calendar>
    </I18nProvider>
  )
}
