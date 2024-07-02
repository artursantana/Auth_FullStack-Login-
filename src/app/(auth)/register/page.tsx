


'use client'
import { Formik, Form, FormikHelpers  } from 'formik'
import Input from '@/components/Input'
import React, { useReducer, useState } from 'react'
import Button from '@/components/Button'
import Link from 'next/link'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'


interface FormValues {
    name: string;
    email: string;
    password: string;
  }
  

const Register = () => {

    const [error, setError] = useState('')

    const router = useRouter()

  const initialValues = {
    name: '',
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
      name: Yup.string().required('Obrigatório'),
      email: Yup.string().email('Email inválido').required('Obrigatório'),
    password: Yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres').required('Obrigatório')
  });

  async function handleSubmit(values: FormValues, { resetForm }: FormikHelpers<FormValues>) {
    try {
        await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: values.name,
                email: values.email,
                password: values.password,
            }),
        }).then(async(res) => {
            const result = await res.json()
            if(result.status === 201) {
                alert(result.message)
                router.push('/login')
            }else{
                renderError(result.message)
                resetForm()
            }
        })
    } catch (error) {
        
    }
  }

  const renderError = (msg) => {
    setError(msg)
    setTimeout(()=>{
        setError('')
    },3000)
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
            <Input name='name' type='email' label='name' autoComplete='off' required/>
            <Input name='email' type='email' label='email' autoComplete='off' required/>
                <Input name='password' type='password' required autoComplete='off' label='password'/>
                <Button type='submit' text='Entrar' className='bg-green-500 text-white rounded p-2' />
                <span className='text-xs text-zinc-400'>Não possui uma conta? <strong className='text-white'><Link href='/login'>Entre</Link></strong></span>
        </Form>
        )}
      </Formik>
    </div>
  )
}

export default Register
