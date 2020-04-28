import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../components';
import { useFormik } from 'formik';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

export default () => {

  const handleSubmit = async (data) => {
    const url = 'api/cadastro';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });

      if (response.status === 200) {
        const { token } = await response.json();
        // await login({ token });
        Router.push('/login');
        alert(token);

      } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    } catch (error) {
      const { response } = error;
    }
  };

  const formik = useFormik({
    initialValues: {
      nome: '',
      cpf: '',
      email: '',
      senha: ''
    },
    onSubmit: data => {
      handleSubmit(data)
    },
  });
  return (
    <>
      <section className="login-register">

        <form onSubmit={formik.handleSubmit}>
          <p className="login-register-title">{registerTitle}</p>

          <label>{registerUser}</label>
          <input
            name="nome"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.nome}
          />

          <label>Informe seu e-mail</label>
          <input
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          <label>Informe seu CPF:</label>
          <input
            name="cpf"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.cpf}
          />



          <label>{registerPassword}</label>
          <input
            name="senha"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.senha}
          />


          <p className="text-sm mt-1">{caracteres}</p>

          <Button type="submit">{registerBtn}</Button>
          <Link href="/login">
            <a>{registerLoginRegister}</a>
          </Link>
        </form>


      </section>

    </>
  );
};


const registerBtn = 'Cadastrar';
const validade = 'confirme sua senha';
const registerTitle = 'Crie sua Conta';
const registerUser = 'Informe seu usuário:';
const registerPassword = 'Informe sua senha:';
const caracteres = 'Use oito ou mais caracteres';
const registerLoginRegister = 'Faça login em vez disso';

