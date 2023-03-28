import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'

import { name, version } from '../../package.json'

import {
  addNewCycleAction,
  markCurrentCycleAsFinishedAction,
  markCurrentCycleAsInterruptedAction,
} from '../reducers/cycles/actions'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'

const LOCAL_STORAGE_KEY = `@${name}:cycles-state-${version}`

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextData {
  activeCycle: Cycle | undefined
  cycles: Cycle[]
  amountSecondsPassed: number
  createNewCycle: (data: CreateCycleData) => void
  markCurrentCycleAs: (action: 'interrupted' | 'finished') => void
  setAmountSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextData)

export function CyclesContextProvider({ children }: { children: ReactNode }) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    { cycles: [], activeCycleId: null },
    (initialValue) => {
      const storedState = localStorage.getItem(LOCAL_STORAGE_KEY)

      if (!storedState) return initialValue
      return JSON.parse(storedState)
    },
  )
  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle)
      return differenceInSeconds(new Date(), new Date(activeCycle.startedAt))

    return 0
  })

  function createNewCycle(data: CreateCycleData) {
    const startedAt = new Date()
    const id = startedAt.getTime().toString()

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedAt,
    }

    dispatch(addNewCycleAction(newCycle))
  }

  const markCurrentCycleAs: CyclesContextData['markCurrentCycleAs'] =
    useCallback((action) => {
      const options = {
        finished: () => dispatch(markCurrentCycleAsFinishedAction()),
        interrupted: () => dispatch(markCurrentCycleAsInterruptedAction()),
      }

      options[action]()
    }, [])

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem(LOCAL_STORAGE_KEY, stateJSON)
  }, [cyclesState])

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        cycles,
        createNewCycle,
        markCurrentCycleAs,
        amountSecondsPassed,
        setAmountSecondsPassed,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

export function useCycles() {
  return useContext(CyclesContext)
}
