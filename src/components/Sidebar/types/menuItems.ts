export interface MenuItems {
    path: string,
    label: string,
    icon: React.ReactNode,
    permissionLevel: number,
    role: "link" | "button"
}