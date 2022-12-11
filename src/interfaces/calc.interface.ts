export interface IActions {
    type: string;
    payload:string
  }
  
export interface IInicial{
    ADD_DIGIT: string;
    CHOOSE_OPERATION: string;
    CLEAR: string;
    EVALUATE: string;
  }
export interface IState{
    currentOperand: string | null;
    previousOperand: string | null;
    operation: string | null;
    overwrite: boolean
  }