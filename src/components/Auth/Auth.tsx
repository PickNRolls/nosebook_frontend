'use client';

import { useState } from "react";
import { Button } from "../Button";
import { Divider } from "../Divider";
import { Textinput } from "../Textinput";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from "./schemas/register_schema";
import { loginSchema } from "./schemas/login_schema";
import { Register } from "@/typings/Register";

export type AuthProps = {
  onRegister: (data: Register) => void;
};

export const Auth: React.FC<AuthProps> = (props) => {
  const [processType, setProcessType] = useState<'register' | 'login'>('login');
  const loginForm = useForm({
    resolver: zodResolver(loginSchema)
  });
  const registerForm = useForm<Register>({
    resolver: zodResolver(registerSchema)
  });

  const handleLoginSubmit = (data) => {
    console.log(data);
  };

  const handleRegisterSubmit = (data: Register) => {
    props.onRegister(data);
  }

  return (
    <>
      {processType === 'login' && (
        <div
          className="w-80 bg-white rounded-lg flex flex-col items-center gap-3 p-8 px-6"
        >
          <span className="font-medium text-xl mb-3">Вход Nosebook</span>
          <Controller
            name="nickname"
            control={loginForm.control}
            rules={{ required: true }}
            render={(props) => <Textinput placeholder="Логин" {...props} />}
          />
          <Controller
            name="password"
            control={loginForm.control}
            rules={{ required: true }}
            render={(props) => <Textinput placeholder="Пароль" {...props} />}
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
