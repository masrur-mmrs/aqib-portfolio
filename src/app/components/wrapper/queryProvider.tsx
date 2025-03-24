"use client";
import React, { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

interface QueryProviderProps {
    children: React.ReactNode;
}

const QueryProvider: React.FC<QueryProviderProps> = ({children}) => {
    const [client] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    );
};


export default QueryProvider;