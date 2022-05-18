import { useState } from "react";
import calculate, { State } from "../logic/calculate";
import ButtonPanel from "./ButtonPanel";
import Display from "./Display";


function Calculator() {
  const [state, setState] = useState<State>({
    current: "0",
    operand: 0,
    operator: null,
    isNextClear: false
  });

  const buttonHandler = (code: string) => {
    const nextState = calculate(code, state) //stateはコンポーネントの状態として持たせる必要がある
    setState(nextState);
  }
  return (
    <div className="wrapper">
      <div className="calculator">
        <Display value={state.current}/>
        <ButtonPanel buttonHandler={buttonHandler}/>
      </div>
    </div>
  );
}

export default Calculator;