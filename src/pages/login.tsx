import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";
import { LoadingSpinner } from "~/components/loading";

export default function Login() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") ?? "/";
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  // To Handle Login
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!username ?? !password) {
      setIsLoading(false);
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
        setIsLoading(false);
        router.push(callbackUrl);
        toast({
          variant: "success",
          title: "Login Successful",
          description: "You have successfully logged in.",
          duration: 5000,
        });
      } else {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Invalid Credentials",
          description: "Username or password is incorrect.",
          duration: 5000,
        });
      }
    } catch (error) {
      setIsLoading(false);
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
            Welcome to <span className="text-red-400">Nhat Tien</span>
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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="flex h-[20px] w-[39.667px] items-center justify-center">
              <LoadingSpinner />
            </span>
          ) : (
            <span className="font-bold tracking-wide">Login</span>
          )}
        </Button>
      </form>
    </section>
  );
}
