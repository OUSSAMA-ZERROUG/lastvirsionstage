import { FC, ReactNode } from 'react';

interface AuthlayoutProps {
    children: ReactNode;
}

const Authlayout: FC<AuthlayoutProps> = ({ children }) => {
    return (
        <div className='  container mx-auto max-w-sm px-4 py-5 shadow-md mt-10 mb-9 bg-orange-200 p-10 rounded-md'>
            {children}
        </div>
    );
}

export default Authlayout;
