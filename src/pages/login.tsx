import { createRoute, useNavigate, redirect } from '@tanstack/react-router'
import { useState } from 'react';
import { userAuthState } from '../storing/store';
import { mockLoginApi } from '../dummy/authApiMocker'
import { Loader2 } from "lucide-react";

import {
  Field,
  // FieldDescription,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { rootRoute } from '../routing/route'


export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  beforeLoad: () => {
    const userData = userAuthState.getState().getUserData();
    if (userData?.username) {
      throw redirect({ to: '/home' })
    }
  },
  path: '/login',
  component: () => {
    const [isLoading, setIsLoading] = useState(false);
    const { login } = userAuthState();
    const navigate = useNavigate();

    const formSchema = z.object({
      "text-input-0": z.string(),
      "password-input-0": z.string(),
      "submit-button-0": z.string().optional(),
    });


    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        "text-input-0": "",
        "password-input-0": "",
      },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
      setIsLoading(true);
      console.log(values);
      try {
        // 2. Simuliamo la chiamata al server
        const response = await mockLoginApi(values['text-input-0']);

        // 3. Salviamo il token nello store
        login(response.token);

        // 4. Andiamo in Home
        navigate({ to: '/home' });
      } catch (error) {
        console.error("Login fallito", error);
      } finally {
        setIsLoading(false); // Finito il caricamento
      }
    }

    function onReset() {
      form.reset();
      form.clearErrors();
    }
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 space-y-6 border rounded-xl shadow-sm bg-card text-card-foreground">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold tracking-tight">Accedi</h2>
            <p className="text-sm text-muted-foreground">Inserisci le tue credenziali</p>
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onReset={onReset}
            className="space-y-8 @container">
            <div className="grid grid-cols-12 gap-4">
              <Controller
                control={form.control}
                name="text-input-0"
                render={({ field, fieldState }) => (
                  <Field
                    className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel className="flex w-auto!">Text</FieldLabel>
                    <Input
                      key="text-input-0"
                      placeholder="admin"
                      type="text"
                      className=""
                      {...field}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="password-input-0"
                render={({ field, fieldState }) => (
                  <Field
                    className="col-span-12 @5xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel className="flex w-auto!">Password</FieldLabel>
                    <Input
                      key="password-input-0"
                      placeholder=""
                      type="password"
                      className=""
                      {...field}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="submit-button-0"
                render={({ field, fieldState }) => (
                  <Field
                    className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel className="hidden w-auto!">Submit</FieldLabel>
                    <Button
                      key="submit-button-0"
                      id="submit-button-0"
                      name=""
                      className="w-full"
                      type="submit"
                      variant="default"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin" /> {/* 2. L'icona che ruota */}
                          Attendi...
                        </>
                      ) : (
                        "Login"
                      )}
                    </Button>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
          </form>
        </div>
      </div>
    );

  }
})