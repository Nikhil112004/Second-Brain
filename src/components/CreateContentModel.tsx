import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./input";
import { BACKEND_URL } from "../config";
import axios from "axios";

enum ContentType {
  Twitter = "twitter",
  Youtube = "youtube"
}

export function CreateContentModel({ open, onClose }) {
  const titleRef = useRef<HTMLInputElement>();
  const linkRef = useRef<HTMLInputElement>();
  const [type, setType] = useState(ContentType.Youtube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    await axios.post(BACKEND_URL + "/api/v1/content", {
        title,
        link,
        type
        }, {
        headers: {
            Authorization: localStorage.getItem("token") 
        }
        });

        onClose();

    if (title && link) {
      console.log("Content added:", { title, link });
      onClose();
    } else {
      alert("Please fill in both fields.");
    }
  }

return (
  <div>
    {open && (
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-50">
        {/* Background Overlay */}
        <div className="absolute w-full h-full bg-slate-200 opacity-60 z-10"></div>

        {/* Modal */}
        <div className="bg-white p-6 rounded-xl z-20 flex flex-col items-center justify-center gap-6 w-[320px] shadow-lg">
          {/* Close Button */}
          <div className="w-full flex justify-end">
            <div onClick={onClose} className="cursor-pointer">
              <CrossIcon />
            </div>
          </div>

          {/* Inputs */}
          <Input reference={titleRef} placeholder={"Title"} className="w-full" />
          <Input reference={linkRef} placeholder={"Link"} className="w-full" />

          {/* Type Selection */}
          <div className="w-full text-center">
            <h1 className="mb-2 text-lg font-medium">Type</h1>
            <div className="flex justify-center gap-2">
              <Button
                text="Youtube"
                variant={type === ContentType.Youtube ? "primary" : "secondary"}
                onClick={() => setType(ContentType.Youtube)}
              />
              <Button
                text="Twitter"
                variant={type === ContentType.Twitter ? "primary" : "secondary"}
                onClick={() => setType(ContentType.Twitter)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button onClick={addContent} variant="primary" text="Submit" />
        </div>
      </div>
    )}
  </div>
);



}


