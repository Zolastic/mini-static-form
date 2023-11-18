import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";
import { LoadingSpinner } from "~/components/loading";
import Link from "next/link";
import { api } from "~/utils/api";

export default function SignUp() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const { toast } = useToast();

  // To Handle Sign Up

  // const { mutate, isLoading: isRegistering } = api.users.create.useMutation({
  //   onSuccess: () => {
  //     setUsername("");
  //     setPassword("");
  //     toast({
  //       variant: "success",
  //       title: "Registration Successful",
  //       description: "You have successfully registered.",
  //       duration: 5000,
  //     });
  //     router.push("/login");
  //   },
  //   onError: (error) => {
  //     const errorMessage = error?.data?.zodError?.fieldErrors.content;
  //     if (errorMessage?.[0]) {
  //       toast({
  //         variant: "destructive",
  //         title: "Registration Fail!",
  //         description: `${errorMessage[0]}`,
  //         duration: 5000,
  //       });
  //     } else {
  //       toast({
  //         variant: "destructive",
  //         title: "Registration Fail!",
  //         description: `Please try again!`,
  //         duration: 5000,
  //       });
  //     }
  //   },
  // });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) {
      toast({
        variant: "destructive",
        title: "Invalid Credentials",
        description: "Please enter your username and password.",
        duration: 5000,
      });
      return;
    }

    // mutate({ username: username, password: password });
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
          <p className="font-bold tracking-wide">Sign Up</p>
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
        <Button type="submit" disabled={isRegistering}>
          {isRegistering ? (
            <span className="flex h-[20px] w-[60.203px] items-center justify-center">
              <LoadingSpinner />
            </span>
          ) : (
            <span className="font-bold tracking-wide">Sign Up!</span>
          )}
        </Button>
      </form>
      <div className="flex flex-col items-center justify-center">
        <div className="inline-flex w-full items-center justify-center">
          <div className="my-8 h-px w-64 border-0 bg-gray-200 dark:bg-gray-700"></div>
          <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 font-medium text-muted-foreground">
            Already have an account?
          </span>
        </div>
        <Link href={"/login"}>
          <h1 className="tracking-wide text-slate-600 hover:cursor-pointer hover:text-red-400">
            Log in!
          </h1>
        </Link>
      </div>
    </section>
  );
}
