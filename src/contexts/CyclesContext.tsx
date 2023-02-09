import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startedAt: Date
  interruptedAt?: Date
  finishedAt?: Date
}

type MarkCurrentCycleAsDoneReason = Pick<Cycle, 'finishedAt' | 'interruptedAt'>

interface CyclesContextData {
  activeCycle: Cycle | undefined
  cycles: Cycle[]
  createNewCycle: (data: CreateCycleData) => void
  markCurrentCycleAsDone: (reason: MarkCurrentCycleAsDoneReason) => void
}

export const CyclesContext = createContext({} as CyclesContextData)

export function CyclesContextProvider({ children }: { children: ReactNode }) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function createNewCycle(data: CreateCycleData) {
    const startedAt = new Date()
    const id = startedAt.getTime().toString()

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedAt,
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
  }

  const markCurrentCycleAsDone = useCallback(
    (reason: MarkCurrentCycleAsDoneReason) => {
      setCycles((state) =>
        state.map((cycle) => {
          if (cycle.id === activeCycleId) return { ...reason, ...cycle }

          return cycle
        }),
      )

      setActiveCycleId(null)
    },
    [activeCycleId],
  )

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        cycles,
        createNewCycle,
        markCurrentCycleAsDone,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

export function useCycles() {
  return useContext(CyclesContext)
}
