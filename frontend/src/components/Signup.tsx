import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"

type LoginFormValues = {
    username: string
    email: string
    password: string
}

const Signup = () => {
    const form = useForm<LoginFormValues>()

    const onSubmit = async (data: LoginFormValues) => {
        console.log("sigup data",data)
        try {
          const response = await fetch("http://localhost:3000/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error("signup error:", errorData.message);
            alert(errorData.message);
            return;
          }

          const result = await response.json();
          console.log("signup success:", result);
          alert(`account created ${result.user.email}`);
        } catch (err) {
          console.error("Request failed:", err);
          alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="bg-gray-50 p-10 shadow-xl rounded-lg">
            <h2 className="text-2xl font-bold mb-3">Signup</h2>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full md:w-[50rem] max-w-md mx-auto"
                >
                    <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input required type="text" placeholder="Username" {...field} />
                        </FormControl>
                    </FormItem>
                )}
            />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input required type="email" placeholder="Email" {...field} />
                                </FormControl>
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
                                    <Input required type="password" placeholder="Password" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <label>
                        Already have an account
                        <Link className="text-blue-500 ml-2" to="/">
                            login
                        </Link>
                    </label>
                    <Button className="w-full mt-2" type="submit">Signup</Button>
                </form>
            </Form>
        </div>
    )
}

export default Signup
