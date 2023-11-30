'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactNode } from "react"
const TanstackProvider = ({ children }: { children: ReactNode }) => {
    const queryClinet = new QueryClient();
    return (
        <QueryClientProvider client={queryClinet}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default TanstackProvider