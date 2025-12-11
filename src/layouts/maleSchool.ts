import type { LayoutCell } from "../components/main/device/type"

export const maleSchoolLayout: LayoutCell[][] = [
    [
        {
            type: "pair",
            devices: [
                { id: 13, deviceType: "DRY" },
                { id: 12, deviceType: "DRY" },
            ],
        },
        {
            type: "pair",
            devices: [
                { id: 24, deviceType: "DRY" },
                { id: 25, deviceType: "DRY" },
            ],
        },
    ],
    [
        { type: "single", device: { id: 11, deviceType: "WASH" } },
        { type: "single", device: { id: 23, deviceType: "WASH" } },
    ],
    [
        { type: "single", device: { id: 10, deviceType: "WASH" } },
        { type: "single", device: { id: 22, deviceType: "WASH" } },
    ],
    [
        { type: "single", device: { id: 9, deviceType: "WASH" } },
        { type: "single", device: { id: 21, deviceType: "WASH" } },
    ],
    [
        { type: "single", device: { id: 8, deviceType: "WASH" } },
        { type: "single", device: { id: 20, deviceType: "WASH" } },
    ],
    [
        { type: "single", device: { id: 7, deviceType: "WASH" } },
        {
            type: "pair",
            devices: [
                { id: 18, deviceType: "WASH" },
                { id: 19, deviceType: "DRY" },
            ],
        },
    ],
    [
        {
            type: "pair",
            devices: [
                { id: 6, deviceType: "DRY" },
                { id: 5, deviceType: "WASH" },
            ],
        },
        {
            type: "pair",
            devices: [
                { id: 16, deviceType: "DRY" },
                { id: 17, deviceType: "DRY" },
            ],
        },
    ],
    [
        {
            type: "pair",
            devices: [
                { id: 4, deviceType: "DRY" },
                { id: 3, deviceType: "WASH" },
            ],
        },
        {
            type: "pair",
            devices: [
                { id: 14, deviceType: "DRY" },
                { id: 15, deviceType: "DRY" },
            ],
        },
    ],
    [
        {
            type: "pair",
            devices: [
                { id: 2, deviceType: "DRY" },
                { id: 1, deviceType: "WASH" },
            ],
        },
        { type: "empty" },
    ],
]
