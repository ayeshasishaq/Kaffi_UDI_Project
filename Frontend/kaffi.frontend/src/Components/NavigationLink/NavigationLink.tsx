import "../NavigationLink/NavigationLinkStyle.css"
import { useNavigate } from "react-router-dom";

type  NvgtLinkProps = {
 to: string;
 children: React.ReactNode;
}

export function NavigationLink({to, children}: NvgtLinkProps)  {
    const navigate = useNavigate();

    return (
        <button onClick = {() => navigate(to)}  className = "nvgt-link">
            {children}
        </button>    
    );
}