import { Play } from 'phosphor-react'
import { useId } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

const newCycleFormSchema = z.object({
  task: z.string().min(1, 'Informe o nome da tarefa'),
  minutesAmount: z
    .number()
    .min(5, 'Número mínimo de minutos é 5')
    .max(60, 'Número máximo de minutos é 60'),
})

type NewCycleFormData = z.infer<typeof newCycleFormSchema>

export function Home() {
  const taskId = useId()
  const minutesAmountId = useId()
  const taskSuggestionsId = useId()

  const { register, handleSubmit, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
  })

  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log('🚀 ~ file: index.tsx:37 ~ handleCreateNewCycle ~ data', data)
    reset()
  }

  return (
    <HomeContainer>
      <form noValidate onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor={taskId}>Vou trabalhar em</label>
          <TaskInput
            id={taskId}
            placeholder="Dê um nome para o seu projeto"
            list={taskSuggestionsId}
            {...register('task')}
          />

          <datalist id={taskSuggestionsId}>
            <option value="Project 1"></option>
            <option value="Project 2"></option>
            <option value="Project 2"></option>
            <option value="Project 2"></option>
          </datalist>

          <label htmlFor={minutesAmountId}>durante</label>
          <MinutesAmountInput
            id={minutesAmountId}
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit">
          <Play />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
