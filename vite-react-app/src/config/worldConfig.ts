import { IWorldConfig } from "@/types";

export const worldConfig: IWorldConfig[] = [
    {
        name: 'World 0',
        levels: [
            {
                dripDelay: 15 * 1000,
                time: 60,
                rows: 4
            },
            {
                dripDelay: 15 * 1000,
                time: 60,
                rows: 4
            }
        ]
    },
    {
        name: 'World 1',
        levels: [
            {
                dripDelay: 15 * 1000,
                time: 60,
                rows: 4
            },
            {
                dripDelay: 15 * 1000,
                time: 10,
                rows: 4
            }
        ]
    },
    {
        name: 'World 2',
        levels: [
            {
                dripDelay: 15 * 1000,
                time: 60,
                rows: 4
            },
            {
                dripDelay: 15 * 1000,
                time: 60,
                rows: 4
            }
        ]
    },
];
