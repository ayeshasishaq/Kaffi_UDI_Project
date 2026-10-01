import { useEffect } from "react";
import "./ToastStyle.css";

export type ToastType = "info" | "alert" | "error";

type ToastProps = {
    type: ToastType;
    message: string;
    details?: Record<string, string>;
    visible: boolean;
    onClose: () => void;
    duration?: number;
};

export function Toast({ type, message, details, visible, onClose, duration = 4000 }: ToastProps) {
    useEffect(() => {
        if (!visible) return;
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [visible, duration, onClose]);

    return (
        <div
            className={`toast toast-${type} ${visible ? "show" : ""}`}
            role={type === "error" ? "alert" : "status"}
        >
            <div className="toast-header">
                <strong>{message}</strong>
                <button className="toast-close" onClick={onClose} aria-label="Lukk">×</button>
            </div>
            {details && (
                <dl className="toast-details">
                    {Object.entries(details).map(([key, value]) => (
                        <div key={key}>
                            <dt>{key}</dt>
                            <dd>{value}</dd>
                        </div>
                    ))}
                </dl>
            )}
        </div>
    );
}