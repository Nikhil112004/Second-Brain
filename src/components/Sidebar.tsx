import { SidebarItem } from "./sidebarItem"
import { HashtagIcon } from "@heroicons/react/16/solid"
import { 
    BrainIcon, 
    FileText, 
    LinkIcon, 
    LogOut, 
    TwitterIcon, 
    YoutubeIcon 
} from "lucide-react"
import { Button } from "./Button"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
import { Logo } from "../icons/Logo"

export const Sidebar = () => {
    const navigate = useNavigate();

    const sidebarItems = [
        { title: "Twitter", icon: <TwitterIcon className="w-6 h-6" /> },
        { title: "Youtube", icon: <YoutubeIcon className="w-6 h-6" /> },
        { title: "Document", icon: <FileText className="w-6 h-6" /> },
        { title: "Link", icon: <LinkIcon className="w-6 h-6" /> },
        { title: "Tag", icon: <HashtagIcon className="w-6 h-6" /> },
    ];

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/user/logout`, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });

            if(response.data.success) {
                localStorage.removeItem("token");
                navigate("/signin");
                console.log(`Logout successfull: ${response.data.message}`);
            }
        } catch (error) {
            console.error(`Error during logout: ${error}`);
        }
    }

    return <div className="bg-white h-screen w-72 border-r fixed left-0 top-0">
        <div className="flex items-center ml-3 mt-4">
            <Logo className="w-10 h-10 text-Purple-600" />
            <h1 className="text-2xl font-semibold ml-3">Brainly</h1>
        </div>

        <div className="mt-10 ml-4">
            {sidebarItems.map((item, index) => (
                <SidebarItem text={item.title} key={index} icon={item.icon} />
            ))}
        </div>

        <div className="flex justify-center items-center p-4 fixed bottom-0 w-72">
            <Button
                title="Logout"
                variant="full-width"
                startIcon={<LogOut className="w-5 h-5" />}
                size="md"
                onClick={() => handleLogout()}
            />
        </div>
    </div>
}

// import { Logo } from "../icons/Logo";
// import { TwitterIcon } from "../icons/TwitterIcon";
// import { YoutubeIcon } from "../icons/YoutubeIcon";
// import { SidebarItem } from "./sidebarItem";

// export function Sidebar() {
//     return <div className="h-screen bg-white border-r w-72 fixed
//     left-0 top-0 pl-6">
//         <div className="flex text-2xl pt-8 items-center">
//             <div className="pr-2 text-purple-600">
//                 <Logo />
//             </div>
//             Brainly
//         </div>
//         <div className="pt-8 pl-4 "> 
//             <SidebarItem text="Twitter" icon={<TwitterIcon />} />
//             <SidebarItem text="YouTube" icon={<YoutubeIcon />} />
//     </div>
//     </div>
// }
