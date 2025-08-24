import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Logo } from "../icons/Logo";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        if (!username || !password) {
            alert("Please fill in all fields");
            return;
        }

        try {
            await axios.post(BACKEND_URL + "/api/v1/signup", {
                username,
                password,
            });
            alert("You have successfully signed up!");
            navigate("/signin");
        } catch (e) {
            alert("Signup failed. Try again.");
        }
    }

    return (
        <div className="h-screen w-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex justify-center items-center">
            <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
                
              
                <div className="flex flex-col items-center gap-2 mb-6">
                    <div className="text-purple-600">
                        <Logo />
                    </div>
                    <h1 className="text-2xl font-semibold text-gray-800">Create Account</h1>
                    <p className="text-gray-500 text-sm">Join us and get started</p>
                </div>

                
                <div className="space-y-4">
                    <Input 
                        reference={usernameRef} 
                        placeholder="Username" 
                    />
                    <Input 
                        reference={passwordRef} 
                        type="password" 
                        placeholder="Password" 
                    />
                </div>

                <div className="pt-6">
                 <Button 
                   onClick={signup} 
                   variant="full-width" 
                   size="md"
                   title="Sign Up"
                 />

                </div>

                
                <div className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
                    <span 
                        onClick={() => navigate("/signin")} 
                        className="text-purple-600 hover:text-purple-800 cursor-pointer font-medium"
                    >
                        Sign In
                    </span>
                </div>
            </div>
        </div>
    );
}


