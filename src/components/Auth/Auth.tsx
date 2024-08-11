'use client';

import { useState } from "react";
import { Button } from "../Button";
import { Divider } from "../Divider";
import { Textinput } from "../Textinput";
import { Controller, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from "./schemas/register_schema";
import { loginSchema } from "./schemas/login_schema";
import { Register } from "@/typings/Register";
import { Login } from "@/typings/Login";
import { ApiResponse, ApiResponseError } from "@/typings/ApiResponse";
import { decorateAction } from "../decorateAction";

export type AuthProps = {
  onRegister: (data: Register) => Promise<ApiResponse>;
  onLogin: (data: Login) => Promise<ApiResponse<number>>;
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
