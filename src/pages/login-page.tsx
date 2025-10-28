import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { type TUser, user } from "@/libs/schema";
import { useAuth } from "@/context/auth-context";


export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const form = useForm<TUser>({
    resolver: zodResolver(user),
    defaultValues: {
      username: "",
      password: ""
    },
  })

  async function onSubmit(values: TUser) {
    try {
      await login({
        username: values.username,
        password: values.password
      })

      navigate('/dashboard')
    } catch (error: any) {
      alert(error.message || "Gagal login");
    }
  }

  return (
    <section className="grid grid-cols-1 place-items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-3xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="john doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="********" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Register</Button>
            </form>
          </Form>
        </CardContent>
        <p className="text-center text-sm">Don&apos;t have an account?
          <Link to="/register" className="text-blue-400 px-2">register here</Link>
        </p>
      </Card>
    </section>
  )

}
