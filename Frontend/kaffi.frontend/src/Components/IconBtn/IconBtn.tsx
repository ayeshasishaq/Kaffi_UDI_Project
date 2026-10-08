import "../IconBtn/Icon.Btn.css"

type IconBtnProperties = {
    children: React.ReactNode;
    onClick?: () => void;
}

export function IconBtn({children, onClick}: IconBtnProperties) {
    return(
        <button className = "icon-btn" onClick={onClick}>
         {children}
        </button>
    );
}