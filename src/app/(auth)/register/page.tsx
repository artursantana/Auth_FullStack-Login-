'use client'
import { Formik, Form, FormikHelpers } from 'formik';
import Input from '@/components/Input';
import React, { useState } from 'react';
import Button from '@/components/Button';
import Link from 'next/link';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

interface FormValues {
    name: string;
    email: string;
    password: string;
    disabled?: boolean;
}

const Register: React.FC = () => {
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    const [Result, setResult] = useState(null);  
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);
    const router = useRouter();

    const initialValues: FormValues = {
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
        setIsFormSubmitting(true);
        setError('');
        setMsg('');

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const result = await response.json();

            if (result.status === 201 || result.status === 409) {
                setMsg(result.message);
                setResult(result.status);
                if (result.status === 201) {
                    setTimeout(() => {
                        router.push('/login');
                    }, 3000); // Delay to show success message before redirecting
                }
            } else {
                setError(result.message);
                resetForm();
            }
        } catch (error) {
            console.error('Error creating user:', error);
            setError('Erro ao criar conta, tente mais tarde!');
        } finally {
            setIsFormSubmitting(false);
        }
    }

    console.log(Result)

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                {({ values }) =>
                (
                    <Form noValidate className='flex flex-col gap-2 p-4 border rounded border-zinc-300 min-w-[300px]'>
                        <Input name='name' type='text' label='Nome' autoComplete='off' required />
                        <Input name='email' type='email' label='Email' autoComplete='off' required />
                        <Input name='password' type='password' required autoComplete='off' label='Senha' />
                        <Button type='submit' text={isFormSubmitting ? 'Carregando...' : 'Inscrever-se'} className='bg-green-500 text-white rounded p-2' />
                        {
                            msg && (
                                <span className={` text-sm text-center ${Result === 201 ? 'text-green-500' : 'text-red-500'}`}>{msg}</span>
                            )
                        }
                      
                        <span className='text-xs text-zinc-400'>Já possui uma conta? <strong className='text-white'><Link href='/login'>Entre</Link></strong></span>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Register;
