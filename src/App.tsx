import { useReducer, useState } from 'react'
import { IActions, IInicial, IState } from './interfaces/calc.interface'
import DigitButton from './components/DigitButton'
import OperationButton from './components/OperationButton'
import './App.css'

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  EVALUATE: 'evaluate',
  DELETE_DIGIT: 'delete-digit'
}

const initialState:IState = {
  currentOperand: '',
  previousOperand: null,
  operation: null,
  overwrite: false
}

const evaluate = ({currentOperand, previousOperand, operation}:IState) => {

  const prev = parseFloat(previousOperand??toString())
  const current = parseFloat(currentOperand??toString())

  if (isNaN(prev) || isNaN(current)) return ''
  let computation = 0

  switch(operation) {
    case '+':
      computation = prev + current
      break
    case '-':
      computation = prev - current
      break
    case '*':
      computation = prev * current
      break
    case '/':
      computation = prev / current
      break
  }
  return computation.toString()
}

const INTERGER_FORMAT =  new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 0
})

const formatOperand = (operand:string | null) => {
  if (operand == null) return
  const [integer, decimal] = operand.split('.')
  if (decimal == null) return INTERGER_FORMAT.format(Number(integer))
  return `${INTERGER_FORMAT.format(Number(integer))}.${decimal}`
}

const reducer = (state:IState, { type, payload}:IActions) => {
console.log(type)
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite) {
        return {
          ...state,
          currentOperand: payload,
          overwirte: false
        }
      }
      if (payload === '0' && state.currentOperand === '0'
      || state.currentOperand === '0.') {
        return state
      }
      if (payload === '.' && state.currentOperand?.includes(".")) {
        console.log("tiene punto")
        return state
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload}`
      }
     
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      } 

      if (state.currentOperand == null) {
         return {
          ...state,
          operation: payload,

        }
      }

      if (state.previousOperand == null) {
        console.log(state.currentOperand, state.previousOperand)
        return {
          ...state,
          operation: payload,
          previousOperand: state.currentOperand,
          currentOperand: null
        } 
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload,
        currentOperand: null
      }

    case ACTIONS.EVALUATE:
      if (state.currentOperand == null || state.previousOperand == null
        || state.operation == null) {
        return state
      }
      
      return {
        ...state,
        previousOperand: null,
        currentOperand: evaluate(state),
        operation: null,
        overwrite: true
      }
     
    case ACTIONS.DELETE_DIGIT:

      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        }
      }
      
      if (state.currentOperand == null) return state

      if (state. currentOperand.length === 1) {

        return {
          ...state,
          currentOperand: null
        }
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
    
    case ACTIONS.CLEAR:
      return initialState
  }

  console.log("estado",state)
  // console.log("Estado... ", state)
  return state
}

function App() {
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="calculator-grid">
      <div className='output'>
        <div className='previous-operand'>
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className='current-operand'>{formatOperand(currentOperand)}</div>
      </div>
      <button className='span-two' onClick={() => dispatch({ type: ACTIONS.CLEAR, payload: ''})}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT, payload: ''})}>DEL</button>
      <OperationButton operation='/' dispatch={dispatch}/>
      <DigitButton digit='1' dispatch={dispatch} />
      <DigitButton digit='2' dispatch={dispatch} />
      <DigitButton digit='3' dispatch={dispatch} />
      <OperationButton operation='*' dispatch={dispatch}/>
      <DigitButton digit='4' dispatch={dispatch} />
      <DigitButton digit='5' dispatch={dispatch} />
      <DigitButton digit='6' dispatch={dispatch} />
      <OperationButton operation='+' dispatch={dispatch}/>
      <DigitButton digit='7' dispatch={dispatch} />
      <DigitButton digit='8' dispatch={dispatch} />
      <DigitButton digit='9' dispatch={dispatch} />
      <OperationButton operation='-' dispatch={dispatch}/>
      <DigitButton digit='.' dispatch={dispatch} />
      <DigitButton digit='0' dispatch={dispatch} />
      <button className='span-two' onClick={() => dispatch({ type: ACTIONS.EVALUATE, payload: ''})}>=</button>
    </div>
  )
}

export default App
