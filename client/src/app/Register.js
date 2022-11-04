import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch }  from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import '../../node_modules/react-toastify/dist/ReactToastify.css'
import { register, resetAuth } from '../features/auth/authSlice'
import { 
    selectTrashNotebook,
    selectCommonNotebook
} from '../features/notebooks/notebooksSlice'

import styles from '../scss/features/auth/RegisterLogin.module.scss'
import commonCss from '../scss/app/Common.module.scss'

function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const newCommonNotebook = useSelector(selectCommonNotebook)
    const newTrashNotebook = useSelector(selectTrashNotebook)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData
    const { user, isError, isSuccess, message } = useSelector(state => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(resetAuth())
    }, [user, isError, isSuccess, message, newCommonNotebook, newTrashNotebook, navigate, dispatch])

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = e => {
        e.preventDefault()

        if (password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password
            }
            dispatch(register(userData))
        }
    }

    return (
        <section className={styles.login}>
            <ToastContainer />
            <div className={styles.login__container}>
                <h1 className={styles.login__title}>Register</h1>
                <p className={styles.login__description}>Please create an account</p>

                <form onSubmit={onSubmit}>
                    <div className={styles.login__form_field_container}>
                        <input 
                            type='text'
                            id='name'
                            name='name'
                            value={name}
                            placeholder='Enter your name'
                            onChange={onChange}
                            className={styles.login__input}
                        />
                    </div>
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
                    <div className={styles.login__form_field_container}>
                        <input 
                            type='password'
                            id='password2'
                            name='password2'
                            value={password2}
                            placeholder='Confirm your password'
                            onChange={onChange}
                            className={styles.login__input}
                        />
                    </div>
                    <div className={styles.login__btns_container}>
                        <button type='submit' className={`${commonCss.btn___main} ${commonCss.btn___success}`}>
                            Submit
                        </button>
                        <Link to='/login' className={`${commonCss.btn___main} ${commonCss.btn___common}`}>
                          Login
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Register