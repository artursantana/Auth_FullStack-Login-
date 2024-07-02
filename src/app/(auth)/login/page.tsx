
'use client'
import { Formik, Form } from 'formik'
import Input from '@/components/Input'
import React from 'react'
import Button from '@/components/Button'
import Link from 'next/link'
import * as Yup from 'yup'


const Login = () => {

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Email inválido').required('Obrigatório'),
    password: Yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres').required('Obrigatório')
  });

  const handleSubmit = () => {

  }

    
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({values}) => 
        (
        <Form noValidate className='flex flex-col gap-2 p-4 border rounded border-zinc-300 min-w-[300px]bg-white'>
                <Input name='email' type='email' label='email' autoComplete='off' required/>
                <Input name='password' type='password' required autoComplete='off' label='password'/>
                <Button type='submit' text='Entrar' className='bg-green-500 text-white rounded p-2' />
                <span className='text-xs text-zinc-400'>Não possui uma conta? <strong className='text-white'><Link href='/register'>Inscreva-se</Link></strong></span>
        </Form>
        )}
      </Formik>
    </div>
  )
}

export default Login
