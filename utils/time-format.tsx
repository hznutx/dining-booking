export const generateTimeSlots = (
  startTime: string,
  endTime: string,
  stepMinutes: number = 30,
): string[] => {
  const result: string[] = []

  const toMinutes = (time: string) => {
    const [h, m] = time.split(':').map(Number)
    return h * 60 + m
  }

  const toTimeString = (minutes: number) => {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
  }

  let current = toMinutes(startTime)
  const end = toMinutes(endTime)

  while (current <= end) {
    result.push(toTimeString(current))
    current += stepMinutes
  }

  return result
}

export const formatTimeRange = (
  selectTime: Date,
  durationMn: number,
): string => {
  const toPg = (date: Date) =>
    date?.toISOString().replace('T', ' ').slice(0, 19)

  const start = new Date(selectTime)
  const end = new Date(start)
  end.setMinutes(end.getMinutes() + durationMn)

  const range = `[${toPg(start)},${toPg(end)})`
  return range
}
