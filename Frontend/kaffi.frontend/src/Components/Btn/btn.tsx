import "../Btn/btn.css"

type BtnProperties = {
    // Function skal også inn her -> hente og matche fra databasen, bytte side og printe ut data
    children: React.ReactNode;
}

export function Btn({children}: BtnProperties) {
    return(
        <button className = "main-btn">
         {children}
        </button>
    );
}