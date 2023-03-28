import { Cycle } from './reducer'

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
  MARK_CURRENT_CYCLE_AS_INTERRUPTED = 'MARK_CURRENT_CYCLE_AS_INTERRUPTED',
}

export type ActionTypesProps =
  | { type: ActionTypes.ADD_NEW_CYCLE; payload: { newCycle: Cycle } }
  | { type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED }
  | { type: ActionTypes.MARK_CURRENT_CYCLE_AS_INTERRUPTED }

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: { newCycle },
  } as const
}

export function markCurrentCycleAsFinishedAction() {
  return {
    type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
  } as const
}

export function markCurrentCycleAsInterruptedAction() {
  return {
    type: ActionTypes.MARK_CURRENT_CYCLE_AS_INTERRUPTED,
  } as const
}
