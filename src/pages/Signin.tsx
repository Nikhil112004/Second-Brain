import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Logo } from "../icons/Logo";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
            username,
            password
        });
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        navigate("/dashboard");
    }

    return (
        <div className="h-screen w-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex justify-center items-center">
            <div className="bg-white shadow-2xl rounded-2xl w-96 p-8">
              
                <div className="flex flex-col items-center gap-2 mb-6">
                    <div className="text-purple-600">
                        <Logo />
                    </div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Welcome Back 👋
                    </h1>
                    <p className="text-sm text-gray-500">
                        Sign in to continue to <span className="font-semibold">Brainly</span>
                    </p>
                </div>

               
               <div className="space-y-4">
  <Input
    reference={usernameRef}
    placeholder="Username"
    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
  />
  <Input
    reference={passwordRef}
    placeholder="Password"
    type="password"
    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
  />
</div>

<div className="pt-6">
  <Button
    onClick={signin}
    variant="primary"
    size="md"
    title="Sign In"
    className="w-full rounded-lg"
  />
</div>


                <p className="text-sm text-gray-500 text-center mt-6">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-purple-600 hover:text-purple-800 font-medium">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}

