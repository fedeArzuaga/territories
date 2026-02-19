export interface ActivityRegisterData {
    id: string;
    territoryId: number;
    lastLeaderName: string;
    started: Date;
    finished: Date | null;
}