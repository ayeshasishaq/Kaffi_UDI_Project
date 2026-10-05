import "../Btn/btn.css"

type BtnProperties = {
    children: React.ReactNode;
    onClick?: () => void;
}

export function Btn({children, onClick}: BtnProperties) {
    return(
        <button className = "main-btn" onClick={onClick}>
         {children}
        </button>
    );
}