import { create } from 'zustand';

interface User{
    email: string;
    username: string;
}
interface Authdata{
    user: User | null;
    token: string | null;
    loading: boolean;
    setLoading: (loading: boolean) => void,
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void
}

const useAuthStore = create<Authdata>((set) => ({
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
    setLoading: (loading) => set({ loading }),
    user: null,
    token: null,
    loading: false,
}));

export default useAuthStore