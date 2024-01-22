interface AuthProps {
    name?: string;
    email: string;
    password: string;
}

type AuthContextType = {
    token: string;
    responseMessage?: string;
    signIn(props: AuthProps): Promise<void>;
    signUp(props: AuthProps): Promise<void>;
    signOut(): void
};

export type {
    AuthProps,
    AuthContextType
};