import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();


  ////Выводиться в форме value
  const { register, handleSubmit, setError, formState: { errors, isValid } }
    = useForm({
      defaultValues: {
        fullname: 'Yagami Light',
        email: 'yagami@gmail.com',
        password: '123dadada'
      },
      mode: 'onChange'
    })


  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    if (!data.payload) {
      return alert('Failed to log in');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    } else {
      alert('Failed to log in');
    }
    // console.log(values);
    dispatch(fetchAuth(values))
  }
  if (isAuth) {
    return <Navigate to="/" />
  }


  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Create account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Full Name"
          error={Boolean(errors.fullname?.message)}
          helperText={errors.fullname?.message}
          {...register('fullname', { required: 'Enter Full Name' })}
          fullWidth />
        <TextField
          className={styles.field}
          label="Email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Enter email' })}
          fullWidth />
        <TextField
          className={styles.field}
          label="Password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Enter password' })}
          fullWidth />
          {/* Если неправильные филды то кнопка отключена */}
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Register
        </Button>
      </form>
    </Paper>
  );
};
