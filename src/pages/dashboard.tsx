
import '../index.css';
import { Button } from '../components/Button'
import { PlusIcon } from '../icons/PlusIcon';
import { ShareIcon } from '../icons/ShareIcon';
import { Card } from '../components/Card';
import { CreateContentModel } from '../components/CreateContentModel';
import { useEffect, useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { useContents } from '../hooks/useContent';


export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {contents, refresh} = useContents();

  useEffect(() => {
    refresh();
  }, [modalOpen])

  return <div>
    <Sidebar />
  <div className='p-4 ml-76 '>
    <CreateContentModel open={modalOpen} onClose={() => setModalOpen(false)} />
    
    <div className='flex justify-end gap-4'>
      <Button
        onClick={() => setModalOpen(true)}
        variant="primary"
        text="Add content"
        startIcon={<PlusIcon />}
      />
      <Button
        variant="secondary"
        text="Share Brain"
        startIcon={<ShareIcon />}
      />
    </div>

    <div className='flex gap-4 mt-4 flex-wrap'>
      {contents.map(({type, link, title}) => <Card
        type={type}
        link={link}
        title={title}
      />)}
    </div>
  </div>
  </div>
}

