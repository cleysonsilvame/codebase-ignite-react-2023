import { differenceInSeconds } from 'date-fns'
import { useEffect, useState } from 'react'

import { useCycles } from '../../../../contexts/CyclesContext'
import { CountdownContainer, Separator } from './styles'

export function Countdown() {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { activeCycle, markCurrentCycleAsDone } = useCycles()

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      const interval = setInterval(() => {
        const newAmountSecondsPassed = differenceInSeconds(
          new Date(),
          activeCycle.startedAt,
        )
        if (newAmountSecondsPassed >= totalSeconds) {
          markCurrentCycleAsDone({ finishedAt: new Date() })
        } else setAmountSecondsPassed(newAmountSecondsPassed)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, markCurrentCycleAsDone])

  useEffect(() => {
    if (activeCycle) document.title = `${minutes}:${seconds}`
  }, [activeCycle, minutes, seconds])

  useEffect(() => {
    if (!activeCycle && amountSecondsPassed) {
      setAmountSecondsPassed(0)
    }
  }, [activeCycle, amountSecondsPassed])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
