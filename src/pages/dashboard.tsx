import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModel } from "../components/CreateContentModel";
import { Sidebar } from "../components/Sidebar";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { BACKEND_URL } from "../config";
// import { ShareBrain } from "../components/ShareBrainModal";

interface Content {
  _id: string;
  title: string;
  link?: string;
  type: "YOUTUBE" | "TWITTER" | "DOCUMENT" | "LINK" | "TAG" | "CONTENT";
  tags?: string[];
  createdAt: string;
  content?: string;
}

export const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [shareModalOpen, setShareModal] = useState(false);
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    fetchContents();
  }, [])

  const fetchContents = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/content/get`, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });
      if(response.data.success) {
        setContents(response.data.contents);
      }
    } catch (error) {
      console.error(`Error while fetching contants: ${error}`);
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/content/delete`, {
          data: {
            contentId: id
          }, 
          headers: {
            "Authorization": localStorage.getItem("token")
          }
      });
      if(response.data.success) {
        setContents(contents.filter((content) => content._id !== id));
      }
    } catch (error) {
      console.error(`Error deleting content: ${error}`);
    }
  }

  return (
    <div>
      <Sidebar />

      <div className="p-4 ml-72 bg-customPurple-200 min-h-screen">
        <div className="flex justify-between items-center">
          <div className="ml-5">
            <h1 className="text-3xl font-semibold">All Bookmarks</h1>
          </div>

          <div className="flex gap-4">
            <Button 
              variant={"secondary"} 
              size={"md"}
              title={"Share Brain"} 
              startIcon={<ShareIcon className="w-5 h-5" />}
              onClick={() => {
                setShareModal(true);
              }}
            />
            <Button 
              variant={"primary"} 
              size={"md"}
              title={"Add Content"} 
              startIcon={<PlusIcon className="w-5 h-5" />}
              onClick={() => {
                setModalOpen(true);
              }}  
            />
          </div>
        </div>

        
        <div className="mt-11 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {contents.map((contentD) => (
            <Card key={contentD._id} {...contentD} onDelete={handleDelete} />
          ))}
        </div>

        
        <CreateContentModel
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            fetchContents(); 
          }}
        />
        {/* <ShareBrain 
          open={shareModalOpen}
          onClose={() => {
            setShareModal(false);
          }}
        /> */}
      </div>
    </div>
  )
}


// import '../index.css';
// import { Button } from '../components/Button'
// import { PlusIcon } from '../icons/PlusIcon';
// import { ShareIcon } from '../icons/ShareIcon';
// import { Card } from '../components/Card';
// import { CreateContentModel } from '../components/CreateContentModel';
// import { useEffect, useState } from 'react';
// import { Sidebar } from '../components/Sidebar';
// import { useContents } from '../hooks/useContent';


// export function Dashboard() {
//   const [modalOpen, setModalOpen] = useState(false);
//   const {contents, refresh} = useContents();

//   useEffect(() => {
//     refresh();
//   }, [modalOpen])

//   return <div>
//     <Sidebar />
//   <div className='p-4 ml-76 '>
//     <CreateContentModel open={modalOpen} onClose={() => setModalOpen(false)} />
    
//     <div className='flex justify-end gap-4'>
//       <Button
//         onClick={() => setModalOpen(true)}
//         variant="primary"
//         text="Add content"
//         startIcon={<PlusIcon />}
//       />
//       <Button
//         variant="secondary"
//         text="Share Brain"
//         startIcon={<ShareIcon />}
//       />
//     </div>

//     <div className='flex gap-4 mt-4 flex-wrap'>
//       {contents.map(({type, link, title}) => <Card
//         type={type}
//         link={link}
//         title={title}
//       />)}
//     </div>
//   </div>
//   </div>
// }

