import React from 'react';
import { Spinner } from 'flowbite-react';
const Loading: React.FC = ({}) => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <Spinner color='info' aria-label="Spinner button example" size="lg"/>
        </div>
    );
};

export default Loading;