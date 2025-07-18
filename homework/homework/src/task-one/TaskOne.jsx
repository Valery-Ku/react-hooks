/* import React, {useState} from 'react';
import './TaskOne.css';

function TaskOne() {
    /**
     * Вынесите эти стейты в свой хук, все изменения полей должны валидироваться по разным правилам:
     * firstName, lastName - не могут быть пустыми
     * email - должен совпадать с паттерном email, по которому стандартный email адрес валидный, а test или @some или some@te - будут не валидны
     * password - должен быть не меньше 5 символов и должен включать в себя цифры и спец символы (%$@ и т.д.)
     * confirmPassword - должен совпадать с password
     * */
/*  const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const onSubmitHandle = (event) => {
        event.preventDefault();

        // Используем значения из состояния, а не из event
        const formData = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        };

        // Здесь можно добавить валидацию, если нужно
        // Например, если какое-то поле не валидно, установить ошибку
        // setError('Ошибка валидации');

        // Для примера просто показываем alert с данными
        alert(JSON.stringify(formData));

        // Очистка полей после успешной отправки
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');
    };

   /* return (
        <div className="form-container">
            <div className="error-message">{error}</div>
            <form onSubmit={onSubmitHandle}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="form-input"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="form-input"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-input"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-input"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="form-input"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                />
                <button type="submit" className="form-button">
                    Register
                </button>
            </form>
        </div>
    );
}

export default TaskOne;
 */

import React, { useState } from "react";
import "./TaskOne.css";

function useTaskOne() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      password.length < 5 ||
      !/\d/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>%$]/.test(password) ||
      password !== confirmPassword
    ) {
      setError("Ошибка валидации");
      return false;
    }
    setError("");
    return true;
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    validate,
  };
}

function TaskOne() {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    validate,
  } = useTaskOne();

  const onSubmitHandle = (event) => {
    event.preventDefault();

    if (!validate()) return;

    alert(
      JSON.stringify(
        { firstName, lastName, email, password, confirmPassword },
        null,
        2
      )
    );

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="form-container">
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={onSubmitHandle}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="form-input"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="form-input"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-input"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="form-input"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <button type="submit" className="form-button">
          Register
        </button>
      </form>
    </div>
  );
}

export default TaskOne;