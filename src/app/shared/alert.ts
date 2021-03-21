export interface Alert {
    type?: AlertType;
    message?: string;
    visible: boolean;
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}