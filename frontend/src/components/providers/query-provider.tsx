import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { FC } from 'react';

const queryClient = new QueryClient();

interface Props {
    children: React.ReactNode;
}

const QueryProvider: FC<Props> = ({ children }) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryProvider;
