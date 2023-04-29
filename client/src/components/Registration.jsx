import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { MdError } from 'react-icons/md'
import { fetchUserRegistration } from '../store/action-creators/userAction'

const Registration = ({ setCheck, check }) => {
    const dispatch = useDispatch()

    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
        mode: "onBlur"
    })

    const onSubmit = async (data) => {
        const parseData = JSON.stringify(data)
        const objUser = JSON.parse(parseData)
        await dispatch(fetchUserRegistration(objUser))
        reset()
    }

    return (
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <div className='container__form'>
                <div>
                    <input
                        className='form__input'
                        type='email'
                        placeholder='Email'
                        {...register('email', {
                            required: `Поле не повино бути пустим!`,
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: `Неправильна електронна адреса`
                            }
                        })}
                    />
                    <div className='form__error'>
                        <i>{errors?.email && <MdError />}</i>
                        <span>{errors?.email && <span>{errors?.email?.message || 'Error!'}</span>}</span>
                    </div>
                </div>
                <div>
                    <input
                        className='form__input'
                        type='password'
                        placeholder='Password'
                        {...register('password', {
                            required: `Поле не повино бути пустим!`,
                            minLength: {
                                value: 5,
                                message: 'Недостатньо символів!'
                            },
                            maxLength: {
                                value: 15,
                                message: 'Забагато символів!'
                            }
                        })}
                    />
                    <div className='form__error'>
                        <i>{errors?.password && <MdError />}</i>
                        <span>{errors?.password && <span>{errors?.password?.message || 'Error!'}</span>}</span>
                    </div>
                </div>
            </div>
            <div className='form__btn'>
                <button onClick={() => setCheck(!check)}>Увійти!</button>
                <input value='Зареєструватися' type='submit' disabled={!isValid} />
            </div>
        </form>
    )
}

export default Registration