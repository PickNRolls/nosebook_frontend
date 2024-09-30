'use client';

import { useState } from "react";

import * as dto from '@/dto';

import { Button } from "@/components/button";
import { Divider } from "@/components/divider";
import { Textinput } from "@/components/text-input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from "./schemas/register_schema";
import { loginSchema } from "./schemas/login_schema";
import { Register } from "@/typings/Register";
import { Login } from "@/typings/Login";


import { decorateAction } from "../decorate-action";

export type AuthProps = {
  onRegister: (data: Register) => Promise<dto.ApiResponse>;
  onLogin: (data: Login) => Promise<dto.ApiResponse<number>>;
};

export const Auth: React.FC<AuthProps> = (props) => {
  const [processType, setProcessType] = useState<'register' | 'login'>('login');
  const loginForm = useForm<Login>({
    resolver: zodResolver(loginSchema)
  });
  const registerForm = useForm<Register>({
    resolver: zodResolver(registerSchema)
  });

  const handleLoginSubmit = async (data: Login) => {
    const res = await decorateAction(props.onLogin, {
      handleErrors: false,
    })(data);

    res.handleError('NickError', (err) => {
      loginForm.setError('nick', {
        message: err.message,
      }, {
        shouldFocus: true,
      });
    });

    res.handleError('PasswordError', (err) => {
      loginForm.setError('password', {
        message: err.message,
      }, {
        shouldFocus: true,
      });
    });
  };

  const handleRegisterSubmit = async (data: Register) => {
    const res = await decorateAction(props.onRegister, {
      handleErrors: false,
    })(data);

    res.handleError('NickError', (err) => {
      registerForm.setError('nick', {
        message: err.message,
      }, {
        shouldFocus: true,
      });
    });

    res.handleError('PasswordError', (err) => {
      registerForm.setError('password', {
        message: err.message,
      }, {
        shouldFocus: true,
      });
    });
  }

  return (
    <>
      {processType === 'login' && (
        <div
          className="w-80 bg-white rounded-lg flex flex-col items-center gap-3 p-8 px-6"
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="12" fill="#0277FF" />
            <path d="M33.8317 11.7727V36.5H29.3161L18.5582 20.9368H18.3771V36.5H13.1491V11.7727H17.7372L28.4105 27.3239H28.6278V11.7727H33.8317Z" fill="white" />
          </svg>
          <span className="font-medium text-xl mb-3">Вход Nosebook</span>
          <Controller
            name="nick"
            control={loginForm.control}
            render={(props) => <Textinput placeholder="Логин" {...props} />}
          />
          <Controller
            name="password"
            control={loginForm.control}
            render={(props) => <Textinput placeholder="Пароль" {...props} type="password" />}
          />
          <Button onClick={loginForm.handleSubmit(handleLoginSubmit)}>
            Войти
          </Button>
          <Divider>
            или
          </Divider>
          <Button view="action" onClick={() => setProcessType('register')}>
            Создать аккаунт
          </Button>
        </div>
      )}

      {processType === 'register' && (
        <div
          className="w-80 bg-white rounded-lg flex flex-col items-center gap-3 p-8 px-6"
        >
          <span className="font-medium text-xl mb-3">Регистрация</span>
          <Controller
            name="firstName"
            control={registerForm.control}
            render={(props) => <Textinput placeholder="Имя" {...props} />}
          />
          <Controller
            name="lastName"
            control={registerForm.control}
            render={(props) => <Textinput placeholder="Фамилия" {...props} />}
          />
          <Controller
            name="nick"
            control={registerForm.control}
            render={(props) => <Textinput placeholder="Логин" {...props} />}
          />
          <Controller
            name="password"
            control={registerForm.control}
            render={(props) => <Textinput placeholder="Пароль" {...props} type="password" />}
          />
          <Button view="action" onClick={registerForm.handleSubmit(handleRegisterSubmit)}>
            Создать аккаунт
          </Button>
          <Button view="ghost" className="-mb-3" onClick={() => setProcessType('login')}>
            Назад к входу
          </Button>
        </div>
      )}
    </>
  );
}
