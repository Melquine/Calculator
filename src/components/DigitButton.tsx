import React from 'react'
import { ACTIONS } from '../App'

interface IProps {
    dispatch: ({}:any) => any;
    digit: any;
}
const DigitButton = ({dispatch, digit}:IProps) => {
    // console.log({type: ACTIONS.ADD_DIGIT, payload: {digit}})
  return (
    <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: digit})}>{digit}</button>
  )
}

export default DigitButton