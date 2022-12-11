import React from 'react'
import { ACTIONS } from '../App'

interface IProps {
    dispatch: ({}:any) => any;
    operation: any;
}
const OperationButton = ({dispatch, operation}:IProps) => {
    // console.log({type: ACTIONS.ADD_DIGIT, payload: {operation}})
  return (
    <button onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: operation})}>
        {operation}
    </button>
  )
}

export default OperationButton