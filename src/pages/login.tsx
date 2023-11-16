"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";

export default function login() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();
  const { toast } = useToast();

  // To Handle Login
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) {
      toast({
        variant: "destructive",
        title: "Invalid Credentials",
        description: "Please enter your staff number and password.",
        duration: 5000,
      });
      return;
    }

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (!result?.error) {
        router.push(callbackUrl);
        toast({
          variant: "success",
          title: "Login Successful",
          description: "You have successfully logged in.",
          duration: 5000,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Invalid Credentials",
          description: "Username or password is incorrect.",
          duration: 5000,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Invalid Credentials",
        description: "Ensure ",
        duration: 5000,
      });
    }
  };

  return (
    <section className="container flex flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div>
        <h1 className="flex flex-col items-center justify-center text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          <p>
            Welcome to <span className="text-red-400">Nhat Tien's</span>
          </p>
          <p>Static Google Form.</p>
          <p className="my-5"></p>
          <p className="font-bold tracking-wide">Login</p>
        </h1>
      </div>
      <form
        className="flex flex-col items-start justify-center space-y-3"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          placeholder="Username"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value);
          }}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        />
        <Button type="submit">Login</Button>
      </form>
    </section>
  );
}
