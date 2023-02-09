import { useId } from 'react'
import { useFormContext } from 'react-hook-form'

import { NewCycleFormData } from '../..'
import { useCycles } from '../../../../contexts/CyclesContext'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

export function NewCycleForm() {
  const { activeCycle, cycles } = useCycles()
  const { register } = useFormContext<NewCycleFormData>()

  const taskId = useId()
  const minutesAmountId = useId()
  const taskSuggestionsId = useId()

  return (
    <FormContainer>
      <label htmlFor={taskId}>Vou trabalhar em</label>
      <TaskInput
        id={taskId}
        placeholder="Dê um nome para o seu projeto"
        list={taskSuggestionsId}
        {...register('task', { disabled: !!activeCycle })}
      />

      <datalist id={taskSuggestionsId}>
        {cycles.map((cycle) => (
          <option key={cycle.id} value={cycle.task} />
        ))}
      </datalist>

      <label htmlFor={minutesAmountId}>durante</label>
      <MinutesAmountInput
        id={minutesAmountId}
        type="number"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        {...register('minutesAmount', {
          valueAsNumber: true,
          disabled: !!activeCycle,
        })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
