export default function calculate(button: string, state: State): State {
  //数値かどうか
  if (isNumberButton(button)) {
    return handleNumberButton(button, state)
  }
  //オペレーターかどうか
  if (isOperatorButton(button)){
    return handleOperatorButton(button, state);
  }
  //.かどうか
  if (isDotButton(button)) {
    return handleDotButton(state)
  }

  //削除ボタンかどうか
  if (isDeleteButton(button)) {
    return handleDeleteButton(state);
  }

  //ACかどうか
  if (isAllClearButton(button)) {
    return handleAllClearButton();
  }

  // = かどうか
  if (isEqualButton(button)) {
    return handleEqualButton(state);
  }
  return state;
}

export interface State {
  current: string;
  operand: number;
  operator: string | null;
  isNextClear: boolean;
}

function isNumberButton(button: string) {
  return (
    button === "0" || 
    button === "1" || 
    button === "2" || 
    button === "3" || 
    button === "4" || 
    button === "5" || 
    button === "6" || 
    button === "7" || 
    button === "8" || 
    button === "9" 
  );
}


function isOperatorButton(button: string) {
  return button === "+" || button === "-"
}

function handleNumberButton(button: string, state: State) {
  if (state.isNextClear) {
    return {
      current: button,
      operand: state.operand,
      operator: state.operator,
      isNextClear: false
    }
  }

  if (state.current === "0") {
    return {
      current: button,
      operand: state.operand,
      operator: state.operator,
      isNextClear: false
    }
  }
  return {
    current: state.current + button,
    operand: state.operand,
    operator: state.operator,
    isNextClear: false
  }
}

function handleOperatorButton(button: string, state: State): State {
  if (state.operator === null) { //+や-ボタンが押されてない時
    return {
      current: state.current,
      operand: parseFloat(state.current),
      operator: button,
      isNextClear: true,
    }
  }
  const nextValue = operate(state)
  return {
    current: `${nextValue}`,
    operand: nextValue,
    operator: button,
    isNextClear: true,
  }
}

function isDotButton(button: string) {
  return button === "."
}

function handleDotButton(state: State) {
  if (state.current.indexOf('.') !== -1) { //indexOfで指定の文字列がない場合は-1が返る
    return state
  }
  return {
    current: state.current + ".",
    operand: state.operand,
    operator: state.operator,
    isNextClear: false
  }
}

function isDeleteButton(button: string) {
  return button === "D";
}

function handleDeleteButton(state: State):State {
  if (state.current.length === 1){
    return {
      current: "0",
      operand: state.operand,
      operator: state.operator,
      isNextClear: false
    }
  }
  return {
    current: state.current.substring(0, state.current.length - 1),
    operand: state.operand,
    operator: state.operator,
    isNextClear: false
  }
}

function isAllClearButton(button: string){
  return button === "AC";
}

function handleAllClearButton():State {
  return {
    current: "0",
    operand: 0,
    operator: null,
    isNextClear: false
  }
}

function isEqualButton(button: string) {
  return button === "=";
}

function handleEqualButton(state: State):State {
  if (state.operator === null){
    return state
    //+や-が選ばれてなければそのまま返す
  }
  const nextValue = operate(state)
  return {
    current: `${nextValue}`,
    operand: 0,
    operator: null,
    isNextClear: true,
  };
}

function operate(state: State): number {
  const current = parseFloat(state.current)
  if (state.operator === "+") {
    return state.operand + current;
  }
  if (state.operator === "-") {
    return state.operand - current;
  }
  return current;
}