import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch }  from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, resetAuth } from '../features/auth/authSlice'

import styles from '../scss/features/auth/RegisterLogin.module.scss'
import commonCss from '../scss/app/Common.module.scss'

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
      })

    const { email, password } = formData
    const { user, isError, isSuccess, message } = useSelector(state => state.auth)

    useEffect(() => {
        if (isError) {
          toast.error(message)
        }
    
        if (isSuccess || user) {
          navigate('/')
        }
    
        dispatch(resetAuth())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    
      const onSubmit = (e) => {
        e.preventDefault()
    
        const userData = {
          email,
          password,
        }
    
        dispatch(login(userData))
      }

    return(
        <section className={styles.login}>
          <div className={styles.login__container}>
              <h1 className={styles.login__title}>Login</h1>
              <p className={styles.login__description}>Login and start adding task</p>

              <form onSubmit={onSubmit}>
                  <div className={styles.login__form_field_container}>
                      <input 
                          type='email'
                          id='email'
                          name='email'
                          value={email}
                          placeholder='Enter your email'
                          onChange={onChange}
                          className={styles.login__input}
                      />
                  </div>
                  <div className={styles.login__form_field_container}>
                      <input 
                          type='password'
                          id='password'
                          name='password'
                          value={password}
                          placeholder='Enter your password'
                          onChange={onChange}
                          className={styles.login__input}
                      />
                  </div>
                  <div className={styles.login__btns_container}>
                      <button type='submit' className={`${commonCss.btn___main} ${commonCss.btn___success}`}>
                          Submit
                      </button>
                      
                      <Link to='/register' className={`${commonCss.btn___main} ${commonCss.btn___common}`}>
                          Register
                      </Link>
                  </div>
              </form>
            </div>
        </section>
    )
}

export default Login