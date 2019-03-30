import React from "react";
import ReactDOM from "react-dom";
import useForm from "react-hook-form";

import "./styles.css";

function App() {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = data => {
    console.log(data);
  };

  console.log(errors);

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstName">First Name</label>
        <input
          name="firstName"
          placeholder="Jane"
          ref={register({
            required: "this is a required",
            maxLength: {
              value: 2,
              message: "Max length is 2"
            }
          })}
        />
        <br />
        {errors.firstName && errors.firstName.message}
        <br />

        <label htmlFor="lastName">Last Name</label>
        <input
          name="lastName"
          placeholder="Doe"
          ref={register({
            required: "this is required",
            minLength: {
              value: 2,
              message: "Min length is 2"
            }
          })}
        />
        <br />
        {errors.lastName && errors.lastName.message}
        <br />

        <label htmlFor="email">Email</label>
        <input
          name="email"
          placeholder="jane@acme.com"
          type="text"
          ref={register({
            required: "this is required",
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email address"
            }
          })}
        />
        <br />
        {errors.email && errors.email.message}
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
