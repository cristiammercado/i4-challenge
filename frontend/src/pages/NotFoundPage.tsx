import {FC} from 'react';
import {TbMoodEmpty} from 'react-icons/tb';

const NotFoundPage: FC = () => {
  return (
    <div className='text-center mt-5 pt-5'>
      <h1 className='pb-4'><TbMoodEmpty size={100}/></h1>
      <h4>Error 404: Página no encontrada</h4>
    </div>
  );
};

export default NotFoundPage;
