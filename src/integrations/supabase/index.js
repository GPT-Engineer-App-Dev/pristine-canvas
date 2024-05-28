import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

// hooks

// EXAMPLE HOOKS SECTION

export const useFoo = () => useQuery({
    queryKey: ['foo'],
    queryFn: () => fromSupabase(supabase.from('foo').select('*,bars(*)')),
    onError: (error) => {
        console.error('Error fetching foo:', error);
    },
    onSettled: () => {
        console.log('Fetched foo data');
    },
});
export const useAddFoo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newFoo) => fromSupabase(supabase.from('foo').insert([{ title: newFoo.title }])),
        onSuccess: () => {
            queryClient.invalidateQueries('foo');
        },
        onError: (error) => {
            console.error('Error adding foo:', error);
        },
    });
};

export const useEvents = () => useQuery({
    queryKey: ['events'],
    queryFn: () => fromSupabase(supabase.from('events').select('*')),
    onError: (error) => {
        console.error('Error fetching events:', error);
    },
    onSettled: () => {
        console.log('Fetched events data');
    },
});