import { create } from 'zustand';

interface User{
    email: string;
    username: string;
}
interface Authdata{
    user: User | null;
    token: string | null;
    loading: boolean;
    step: number | null;
    setStep: (step: number | null) => void,
    setLoading: (loading: boolean) => void,
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void
}

const useAuthStore = create<Authdata>((set) => ({
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
    setLoading: (loading) => set({ loading }),
    setStep: (step) => set({step}),
    user: null,
    token: null,
    loading: false,
    step: 1
}));

export default useAuthStore