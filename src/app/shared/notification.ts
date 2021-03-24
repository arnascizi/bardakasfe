export interface Notification {

    type: NotificationType;
    title: string;
    message: string;
    cancelButtonName?: string;
    confirmButtonName?: string;
}

export enum NotificationType {
    Success,
    Error,
    Confirm
}