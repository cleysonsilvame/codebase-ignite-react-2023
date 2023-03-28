import produce from 'immer'
import { ActionTypes, ActionTypesProps } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startedAt: Date
  interruptedAt?: Date
  finishedAt?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(
  state: CyclesState,
  action: ActionTypesProps,
): CyclesState {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return produce(state, (draft) => {
        const currentCycleIndex = state.cycles.findIndex(
          (cycle) => cycle.id === state.activeCycleId,
        )

        if (currentCycleIndex < 0) return

        draft.cycles[currentCycleIndex].finishedAt = new Date()
        draft.activeCycleId = null
      })

    case ActionTypes.MARK_CURRENT_CYCLE_AS_INTERRUPTED:
      return produce(state, (draft) => {
        const currentCycleIndex = state.cycles.findIndex(
          (cycle) => cycle.id === state.activeCycleId,
        )

        if (currentCycleIndex < 0) return

        draft.cycles[currentCycleIndex].interruptedAt = new Date()
        draft.activeCycleId = null
      })
    default:
      return state
  }
}
