import {FC} from 'react';
import {Placeholder} from 'react-bootstrap';

const TableLoader: FC = () => {
  return (
    <tbody>
    {Array.from<number>({length: 4}).map((_e: number, i: number) => (
      <tr key={i}>
        {Array.from<number>({length: 4}).map((_e2: number, i2: number) => (
          <td key={i2}>
            <Placeholder as='p' animation='glow' className='mb-0'>
              <Placeholder xs={12}/>
            </Placeholder>
          </td>
        ))}
      </tr>
    ))}
    </tbody>
  );
};

export default TableLoader;
