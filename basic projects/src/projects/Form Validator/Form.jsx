import React, { useState } from 'react'

const Form = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    const newErrors = { ...errors };

    if (name === "name") {
      if (value.length < 3) {
        newErrors[name] = "Name must be at least 3 characters long";
      } else {
        delete newErrors[name];
      }
    }

    if (name === "email") {
      if (!value.includes("@")) {
        newErrors[name] = "Email must contain @";
      } else {
        delete newErrors[name];
      }
    }

    if (name === "password") {
      if (value.length < 6) {
        newErrors[name] = "Password must be at least 6 characters long";
      } else {
        delete newErrors[name];
      }
    }

    setErrors(newErrors);
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
    setSubmitted(false); // Reset success message if user edits form again
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final check before submit
    if (
      inputs.name.length >= 3 &&
      inputs.email.includes('@') &&
      inputs.password.length >= 6 &&
      Object.keys(errors).length === 0
    ) {
      console.log("Form Submitted Successfully ✅", inputs);
      setSubmitted(true);
      setInputs({
        name: "",
        email: "",
        password: ""
      });
    } else {
      alert("Please fix the errors before submitting.");
      setSubmitted(false);
    }
  }

  return (
    <section className='p-4 border border-white flex flex-col gap-4'>
      <h1 className='text-center p-3 text-2xl'>Form</h1>

      {submitted && (
        <p className='text-green-500 text-center'>Form submitted successfully!</p>
      )}

      <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
        {/* Name */}
        <div className='p-3 flex flex-col gap-2'>
          <input
            type="text"
            id="name"
            placeholder='Enter your name'
            className='outline-none border border-white p-3'
            value={inputs.name}
            onChange={handleChange}
          />
          {errors.name && <span className='text-red-500'>{errors.name}</span>}
        </div>

        {/* Email */}
        <div className='p-3 flex flex-col gap-2'>
          <input
            type="email"
            id="email"
            placeholder='Enter your email'
            className='outline-none border border-white p-3'
            value={inputs.email}
            onChange={handleChange}
          />
          {errors.email && <span className='text-red-500'>{errors.email}</span>}
        </div>

        {/* Password */}
        <div className='p-3 flex flex-col gap-2'>
          <input
            type="password"
            id="password"
            placeholder='Enter your password'
            className='outline-none border border-white p-3'
            value={inputs.password}
            onChange={handleChange}
          />
          {errors.password && <span className='text-red-500'>{errors.password}</span>}
        </div>

        {/* Submit */}
        <button
          className={`p-2 border border-white bg-blue-600 hover:bg-blue-700 text-white transition ${
            Object.keys(errors).length > 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          type="submit"
          disabled={Object.keys(errors).length > 0}
        >
          Submit
        </button>
      </form>
    </section>
  )
}

export default Form;
