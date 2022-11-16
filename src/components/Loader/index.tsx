import { Spinner } from 'reactstrap';

const Loader = () => (
    <div className='text-center'>
        <Spinner />
    </div>
);

export const MainLoader = () => (
    <div
        className='text-center'
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '70vh',
        }}
    >
        <Spinner />
    </div>
);

export default Loader;
