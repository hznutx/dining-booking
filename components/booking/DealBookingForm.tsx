'use client'

import { TimeController } from './TimeController'
import { IDealBooking } from '../restaurants/DealBooking'
import {
  Button,
  DateValue,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
  toast,
} from '@heroui/react'
import { useEffect, useState } from 'react'
import { formatTimeRange, getTimeLog } from '@/utils/time-format'
import { DatePicker } from './DatePicker'
import { getLocalTimeZone } from '@internationalized/date'
import { useAuth } from '@/context/AuthContext'
import { AccordingList } from '../design-system/AccordingList'
import { useTranslations } from 'next-intl'
import { IReservation } from '@/types/reservations'
import { LuMessageCircleWarning } from 'react-icons/lu'
import { useForm } from 'react-hook-form'
import { trimRegexPhone } from '@/utils'
import { supabase } from '@/utils/supabase/client'

export interface ICreateReservation extends IReservation {}

export type IUserBookingDetail = Pick<
  IReservation,
  'guest_name' | 'guest_email' | 'phone' | 'remark'
>

const DealBookingForm: React.FC<IDealBooking> = ({ data: deal }) => {
  const t = useTranslations()
  const { user } = useAuth()

  const [date, setDate] = useState<DateValue | null>(null)
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    reset,
  } = useForm<IUserBookingDetail>()

  useEffect(() => {
    if (user) {
      setValue('guest_name', user.user_metadata?.full_name)
      setValue('guest_email', user.email)
    }
  }, [user, setValue])

  const onSubmit = async (form: IUserBookingDetail) => {
    if (!deal || !selectedDateTime) {
      toast.warning(t('deal.select_time'))
      return
    }

    const payload: ICreateReservation = {
      ...(user && { user_id: user.id }),
      deal_id: deal.id,
      restaurant_id: deal.res_id,
      time_range: formatTimeRange(selectedDateTime, deal.duration),
      guest_count: deal.max_seat,
      guest_email: user?.email ? user.email : form.guest_email,
      ...(form.guest_name && { guest_name: form.guest_name }),
      ...(form.phone && { phone: form.phone }),
      ...(form.remark && { remark: form.remark }),
    }

    const { data, error } = await supabase
      .from('reservations')
      .insert([payload])
      .select()
    if (error) {
      console.log('🚀 error:', error)
      toast.danger(t('form.error_submit'))
    }
    if (data) toast.success(`${t('form.success')}`)
  }

  const onChange = (newDate: DateValue) => {
    setDate(newDate)
  }

  const handleSelectTime = (time: string) => {
    if (!date) {
      return
    }

    const baseDate = date.toDate(getLocalTimeZone())
    const [hours, minutes] = time.split(':').map(Number)

    const finalDate = new Date(baseDate)
    finalDate.setHours(hours, minutes, 0, 0)

    setSelectedDateTime(finalDate)
  }

  const resetForm = () => {
    setSelectedDateTime(null)
    setDate(null)
    reset()
  }

  return (
    <div>
      <Form
        className="flex w-full flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <DatePicker date={date} onChange={onChange} />

        <AccordingList
          showController
          items={[
            {
              id: '1',
              disabled: !date,
              ...(!selectedDateTime && {
                icon: <LuMessageCircleWarning className="text-accent mr-2" />,
              }),
              title: !date
                ? `${t('deal.booking_time')}`
                : selectedDateTime
                  ? `${t('deal.time_log')} ${getTimeLog(
                      selectedDateTime,
                      deal?.duration || 0,
                    )}`
                  : `${t('deal.select_time')}`,
              content: (
                <TimeController
                  disabled={!date}
                  start={String(deal?.restaurants?.open)}
                  end={String(deal?.restaurants?.close)}
                  onSelectTime={handleSelectTime}
                />
              ),
            },
            {
              id: '2',
              title: `${t('deal.booking_detail')}`,
              content: (
                <Fieldset>
                  <Description>{t('deal.form.subtitle')}</Description>
                  <FieldGroup>
                    <TextField
                      isRequired
                      validate={(value) => {
                        if (value.length < 3) {
                          return t('error.name')
                        }
                        return null
                      }}
                    >
                      <Label>{t('form.name')}</Label>
                      <Input
                        {...register('guest_name', {
                          required: true,
                          minLength: 3,
                        })}
                        placeholder={t('deal.form.ex_name')}
                      />
                      <FieldError />
                    </TextField>

                    {!user?.email && (
                      <TextField
                        isRequired={!user?.email}
                        type="email"
                        validate={(value) => {
                          if (value.length < 3) {
                            return t('error.email')
                          }
                          return null
                        }}
                      >
                        <Label>{t('form.email')}</Label>
                        <Input
                          {...register('guest_email', { required: true })}
                          placeholder="contact@gelato.com"
                        />
                        <FieldError />
                      </TextField>
                    )}

                    <TextField
                      isRequired
                      validate={(value) => {
                        if (!/^\+?\d{9,15}$/.test(value)) {
                          return t('error.phone')
                        } else if (value.length < 9) {
                          return t('error.phone_length')
                        } else return null
                      }}
                    >
                      <Label>{t('form.phone')}</Label>
                      <Input
                        maxLength={15}
                        {...register('phone', { required: true })}
                        onChange={(e) => {
                          const cleaned = trimRegexPhone(e.target.value)
                          setValue('phone', cleaned, { shouldValidate: true })
                        }}
                        placeholder={t('form.phone')}
                      />
                      <FieldError />
                    </TextField>

                    <TextField>
                      <Label>{t('form.textarea')}</Label>
                      <TextArea {...register('remark')} />
                      <FieldError />
                    </TextField>
                  </FieldGroup>

                  <Fieldset.Actions>
                    <Button type="submit" isDisabled={isSubmitting}>
                      {t('form.submit')}
                    </Button>
                    <Button
                      type="reset"
                      onClick={resetForm}
                      variant="secondary"
                    >
                      {t('form.cancel')}
                    </Button>
                  </Fieldset.Actions>
                </Fieldset>
              ),
            },
          ]}
          styleLayout="mx-0 px-0"
        />
      </Form>
    </div>
  )
}

export default DealBookingForm
