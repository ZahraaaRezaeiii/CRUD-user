import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Users from './components/Users';

const queryClient = new QueryClient();

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Users />
        </QueryClientProvider>
    );
};

export default App;
