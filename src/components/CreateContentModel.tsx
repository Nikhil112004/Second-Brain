// import { useRef, useState } from "react";
// import { CrossIcon } from "../icons/CrossIcon";
// import { Button } from "./Button";
// import { Input } from "./input";
// import { BACKEND_URL } from "../config";
// import axios from "axios";

// enum ContentType {
//   Twitter = "twitter",
//   Youtube = "youtube"
// }

// export function CreateContentModel({ open, onClose }) {
//   const titleRef = useRef<HTMLInputElement>();
//   const linkRef = useRef<HTMLInputElement>();
//   const [type, setType] = useState(ContentType.Youtube);

//   async function addContent() {
//     const title = titleRef.current?.value;
//     const link = linkRef.current?.value;
//     await axios.post(BACKEND_URL + "/api/v1/content", {
//         title,
//         link,
//         type
//         }, {
//         headers: {
//             Authorization: localStorage.getItem("token") 
//         }
//         });

//         onClose();

//     if (title && link) {
//       console.log("Content added:", { title, link });
//       onClose();
//     } else {
//       alert("Please fill in both fields.");
//     }
//   }

// return (
//   <div>
//     {open && (
//       <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-50">
       
//         <div className="absolute w-full h-full bg-slate-200 opacity-60 z-10"></div>

       
//         <div className="bg-white p-6 rounded-xl z-20 flex flex-col items-center justify-center gap-6 w-[320px] shadow-lg">
        
//           <div className="w-full flex justify-end">
//             <div onClick={onClose} className="cursor-pointer">
//               <CrossIcon />
//             </div>
//           </div>

       
//           <Input reference={titleRef} placeholder={"Title"} className="w-full" />
//           <Input reference={linkRef} placeholder={"Link"} className="w-full" />

          
//           <div className="w-full text-center">
//             <h1 className="mb-2 text-lg font-medium">Type</h1>
//             <div className="flex justify-center gap-2">
//               <Button
//                 title="Youtube"
//                 variant={type === ContentType.Youtube ? "primary" : "secondary"}
//                 onClick={() => setType(ContentType.Youtube)}
//               />
//               <Button
//                 title="Twitter"
//                 variant={type === ContentType.Twitter ? "primary" : "secondary"}
//                 onClick={() => setType(ContentType.Twitter)}
//               />
//             </div>
//           </div>

//           <Button onClick={addContent} variant="primary" title="Submit" size="sm" />
//         </div>
//       </div>
//     )}
//   </div>
// );

// }

import React, { useRef, useState } from "react";
import { Button } from "./Button"
import { Input } from "./input"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

enum ContentType {
    Youtube = "YOUTUBE",
    Twitter = "TWITTER",
    Document = "DOCUMENT",
    Link = "LINK",
    Tag = "TAG",
    Content = "CONTENT"
}

interface CreateContentModelProps {
    open: boolean;
    onClose: () => void;
}

export const CreateContentModel = ({open, onClose}: CreateContentModelProps) => {
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const contentRef = useRef<HTMLInputElement>();

    const [type, setType] = useState(ContentType.Twitter);
    const [tags, setTags] = useState<string[]>([]);
    
    const addContent = async () => {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const content = contentRef.current?.value;
        
         await axios.post(BACKEND_URL + "/api/v1/content", {
            title,
            link,
            type,
            content,
            tags
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });
        
        onClose();
    }

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && e.currentTarget.value) {
            e.preventDefault();
            setTags([...tags, e.currentTarget.value]);
            e.currentTarget.value = "";
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    }

    return <div>
        {open && ( 
            <div className="h-screen w-screen bg-gray-300 fixed top-0 left-0 bg-opacity-70 flex justify-center items-center">
                <div className="max-w-80 w-full rounded-xl bg-white p-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-semibold">Create Content</h1>
                        
                        <div onClick={onClose} className="cursor-pointer rounded-md p-0.5 bg-customPurple-400 text-customPurple-600 hover:text-white hover:bg-customPurple-600 transition-colors duration-100">
                            <XMarkIcon className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="mt-3">
                        <Input reference={titleRef} placeholder="Title" />

                        <div className="relative mt-3">
                            <button
                                id="dropdownDefaultButton"
                                className="w-full text-gray-700 bg-white border border-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 text-left items-center outline-none flex justify-between"
                                type="button"
                                onClick={() => document.getElementById("dropdown")?.classList.toggle("hidden")}
                            >
                                {type} 
                               <ChevronDownIcon className="w-5 h-5" />
                            </button>

                            <div
                                id="dropdown"
                                className="hidden absolute z-10 mt-1 w-full bg-white divide-y divide-gray-100 rounded-lg border"
                            >
                                <ul className="py-2 text-sm text-gray-700 font-medium">
                                    {Object.values(ContentType).map((option) => (
                                        <li
                                            key={option}
                                            onClick={() => {
                                                setType(option);
                                                document.getElementById("dropdown")?.classList.add("hidden");
                                            }}
                                            className="cursor-pointer px-4 py-2 hover:bg-customPurple-400 hover:text-customPurple-600"
                                        >
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <Input reference={linkRef} placeholder="Link (optional)" />
                        <Input reference={contentRef} placeholder="Content (optional)" />

                        <div className="mt-3">
                            <input
                                type="text"
                                placeholder="Add tags (press Enter)"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none"
                                onKeyPress={handleAddTag}
                            />
                            <div className="flex flex-wrap gap-2 mt-1">
                                {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-customPurple-400 text-customPurple-600 px-2 py-1 rounded-full text-sm flex items-center"
                                >
                                    {tag}
                                    <button
                                    type="button"
                                    onClick={() => handleRemoveTag(tag)}
                                    className="ml-1 text-customPurple-600"
                                    >
                                    &times;
                                    </button>
                                </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-2">
                        <Button onClick={addContent} variant="full-width" title="Create Content" size="md" />
                    </div>
                </div>
            </div>
        )}
    </div>
}
