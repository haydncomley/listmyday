import { DateTime } from 'luxon';

export interface IDay {
    date: DateTime;
    group: string;
    events: IDayEvent[];
    notes: string;
}

export interface IDayEvent {
    message: string;
    start: string;
    end: string;
    start_timestamp: DateTime;
    end_timestamp: DateTime;
    duration_seconds: number;
    people: string[];
}

export type IDayDataType = 'listmydata';