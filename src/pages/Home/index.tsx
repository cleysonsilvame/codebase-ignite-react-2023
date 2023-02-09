import { Play } from 'phosphor-react'
import { useId } from 'react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

export function Home() {
  const taskId = useId()
  const minutesAmountId = useId()
  const taskSuggestionsId = useId()

  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor={taskId}>Vou trabalhar em</label>
          <TaskInput
            id={taskId}
            placeholder="Dê um nome para o seu projeto"
            list={taskSuggestionsId}
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
