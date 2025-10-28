import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { user, type TUser } from "@/libs/schema";


export default function RegisterPage() {
  const form = useForm<TUser>({
    resolver: zodResolver(user),
    defaultValues: {
      username: "",
      password: ""
    },
  })

  function onSubmit(values: TUser) {
    console.log(values)
  }
  return (
    <section className="grid grid-cols-1 place-items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-3xl">Create Account</CardTitle>
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
        <p className="text-center text-sm">Already have an account?
          <Link to="/" className="text-blue-400 px-2">login here</Link>
        </p>
      </Card>
    </section>
  )
}
