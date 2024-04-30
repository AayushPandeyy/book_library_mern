import React, { useState } from "react";
import "../../css/Login.css"; // Import CSS for styling (optional)


const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function LoginComponent() {
  const {register,setError, handleSubmit, reset, formState: {errors}} = useForm({
      resolver: yupResolver(loginSchema)
  });



  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email<a className='text-danger'>
                        {errors.email?.message && <span>{errors.email?.message}</span>}
                        </a></label>
          <input
            type="text"
            id="email"
            value={email}
            {...register("email")}
            onChange={(e) => setemail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            {...register("password")}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-login">
          Login
        </button>
      </form>
    </div>
  );
};


