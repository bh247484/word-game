import { IWorldConfig } from "@/types";

export const worldConfig: IWorldConfig[] = [
    {
        name: 'World 0',
        levels: [
            {
                dripDelay: 15 * 1000,
                time: 45,
                rows: 4
            },
            {
                dripDelay: 14 * 1000,
                time: 60,
                rows: 4
            }
        ]
    },
    {
        name: 'World 1',
        levels: [
            {
                dripDelay: 13 * 1000,
                time: 75,
                rows: 4
            },
            {
                dripDelay: 12 * 1000,
                time: 75,
                rows: 5
            }
        ]
    },
    {
        name: 'World 2',
        levels: [
            {
                dripDelay: 11 * 1000,
                time: 80,
                rows: 5
            },
            {
                dripDelay: 10 * 1000,
                time: 90,
                rows: 6
            }
        ]
    },
];
