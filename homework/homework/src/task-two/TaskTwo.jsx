/* import React from 'react'
import RenderCounter from './render-counter/RenderCounter';
import './TaskTwo.css';*/
/*
export default function TaskTwo() {
    const update = useUpdate()
    return (
        <div className="TaskTwo">
            <button onClick={update}>Обновить компонент</button>
            {/*<RenderCounter />*/ /*}
            <Root />
        </div>
    )
}

const Root = () => {
    const [value, setValue] = React.useState('')
    const handleChange = (event) => {
        setValue(event.target.value)
    }
    return (
        <form className="form-container">
            Введенное значение: {value}
            {/*<RenderCounter />}
            <Input onChange={handleChange} />
        </form>
    )
}

const Input = ({ onChange }) => {
    return (
        <div className="input-container">
            <input type="text" className="input-field" name="value" onChange={onChange} />
            {/*<RenderCounter />}
        </div>
    )
}

function useUpdate() {
    const [, setCount] = React.useState(0)
    return () => { setCount(counter => counter + 1) }
} */

import React from "react";
import "./TaskTwo.css";

export default function TaskTwo() {
  const [updateCount, setUpdateCount] = React.useState(0);
  const [value, setValue] = React.useState("");

  const handleChange = React.useCallback((event) => {
    setValue(event.target.value);
  }, []);

  const update = React.useCallback(() => {
    setUpdateCount((count) => count + 1);
  }, []);

  return (
    <div className="TaskTwo">
      <button onClick={update}>Обновить компонент</button>
      <Root value={value} onChange={handleChange} />
    </div>
  );
}

const Root = React.memo(({ value, onChange }) => {
  return (
    <form className="form-container">
      Введенное значение: {value}
      <Input onChange={onChange} />
    </form>
  );
});

const Input = React.memo(({ onChange }) => {
  return (
    <div className="input-container">
      <input
        type="text"
        className="input-field"
        name="value"
        onChange={onChange}
      />
    </div>
  );
});
