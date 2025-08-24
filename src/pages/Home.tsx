import { LightBulbIcon, ChatBubbleLeftRightIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../icons/Logo";

export const Home = () => {
    return (
        <div className="bg-gradient-to-br from-purple-100 to-indigo-200 min-h-screen w-screen flex flex-col">
            <NavBar />
            <div className="flex-1 flex flex-col justify-center">
                <Hero />
            </div>
            <Footer />
        </div>
    );
};

const NavBar = () => {
    return (
       <nav className="flex justify-between items-center shadow-md h-16 bg-white px-6 rounded-b-2xl">
            <div className="text-purple-600 flex items-center gap-2">
                <Logo /> 
                <h1 className="text-2xl text-purple-700 font-bold tracking-wide">Brainly</h1>
            </div>

            <div>
                <Link
                    to={"/signin"}
                    className="text-purple-600 border border-purple-600 font-medium text-base px-4 py-2 mr-3 rounded-lg hover:bg-purple-50 transition"
                >
                    Sign In
                </Link>

                <Link
                    to={"/signup"}
                    className="bg-purple-600 text-white font-medium text-base px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                    Sign Up
                </Link>
            </div>
        </nav>
    );
};

const Footer = () => {
    return (
        <div className="flex justify-center items-center border-t h-16 w-full bg-white shadow-inner rounded-t-2xl">
            <p className="text-gray-500 text-sm">© 2025 Brainly. All rights reserved.</p>
        </div>
    );
};

const Hero = () => {
    return (
        <div className="h-full w-full flex flex-col md:flex-row items-center justify-center px-10 py-12">
        
            <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left mb-10 md:mb-0">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-6xl">
                    Welcome to <span className="text-purple-600">Brainly</span>
                </h1>

                <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                    Your smart companion for learning, problem-solving, and knowledge sharing.  
                    Connect, ask, and grow smarter together with the power of Brainly.
                </p>

                <div className="mt-8">
                    <Link to={"/signin"}>
                        <button className="bg-purple-600 text-white text-lg px-6 py-3 rounded-lg hover:bg-purple-700 transition shadow-md">
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>

         
            <div className="w-full md:w-1/2 flex justify-center items-center relative">
                <div
                    className="absolute w-4/5 h-80 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 transform z-0"
                    style={{ rotate: "4deg" }}
                ></div>

                <div className="bg-white w-4/5 rounded-2xl flex flex-col justify-center items-center p-6 z-20 shadow-2xl border border-gray-100">
                    
                   <FeatureCard
                          title="Your Learning Space"
                          subTitle="Track questions, answers & progress in one place"
                          startIcon={
                              <div className="bg-purple-100 text-purple-600 rounded-lg w-12 h-12 flex justify-center items-center">
                                  <LightBulbIcon className="w-6 h-6 text-purple-600" />
                              </div>
                          }
                        />

                    <FeatureCard
                        title="Collaborative Learning"
                        subTitle="Discuss, share, and grow with peers"
                        startIcon={
                            <div className="bg-indigo-100 text-indigo-600 rounded-lg w-12 h-12 flex justify-center items-center">
                                <ChatBubbleLeftRightIcon className="w-6 h-6" />
                            </div>
                        }
                    />

                    <FeatureCard
                        title="Smart Search"
                        subTitle="Find explanations, notes, and answers instantly"
                        startIcon={
                            <div className="bg-pink-100 text-pink-600 rounded-lg w-12 h-12 flex justify-center items-center">
                                <MagnifyingGlassIcon className="w-6 h-6" />
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    );
};

interface FeatureCardProps {
    title: string;
    subTitle: string;
    startIcon: ReactElement;
}

const FeatureCard = ({ title, subTitle, startIcon }: FeatureCardProps) => {
    return (
        <div className="bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition rounded-xl flex items-center w-full h-20 m-2 px-4">
            <div>{startIcon}</div>
            <div className="ml-4">
                <div className="font-semibold text-gray-800">{title}</div>
                <p className="text-sm text-gray-500">{subTitle}</p>
            </div>
        </div>
    );
};
