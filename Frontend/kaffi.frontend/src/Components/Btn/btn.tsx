import "../Btn/btn.css"

type BtnProperties = {
    // Function skal også inn her -> hente og matche fra databasen, bytte side og printe ut data
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