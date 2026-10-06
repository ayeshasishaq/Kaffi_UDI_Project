import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, type ReactNode } from "react";

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            loginWithRedirect();
        }
    }, [isLoading, isAuthenticated, loginWithRedirect]);

    if (isLoading || !isAuthenticated) return <p>Laster...</p>;

    return <>{children}</>;
}