import type { LayoutCell } from "../components"

export const maleDormLayout: LayoutCell[][] = [
    [
        {
            type: "pair",
            devices: [
                { id: 39, deviceType: "DRY" },
                { id: 38, deviceType: "DRY" },
            ],
        },
        {
            type: "pair",
            devices: [
                { id: 50, deviceType: "DRY" },
                { id: 51, deviceType: "DRY" },
            ],
        },
    ],
    [
        { type: "single", device: { id: 37, deviceType: "WASH" } },
        { type: "single", device: { id: 49, deviceType: "WASH" } },
    ],
    [
        { type: "single", device: { id: 36, deviceType: "WASH" } },
        { type: "single", device: { id: 48, deviceType: "WASH" } },
    ],
    [
        { type: "single", device: { id: 35, deviceType: "WASH" } },
        { type: "single", device: { id: 47, deviceType: "WASH" } },
    ],
    [
        {
            type: "pair",
            devices: [
                { id: 34, deviceType: "DRY" },
                { id: 33, deviceType: "WASH" },
            ],
        },
        {
            type: "pair",
            devices: [
                { id: 45, deviceType: "WASH" },
                { id: 46, deviceType: "DRY" },
            ],
        },
    ],
    [
        { type: "single", device: { id: 32, deviceType: "WASH" } },
        { type: "single", device: { id: 44, deviceType: "WASH" } },
    ],
    [
        {
            type: "pair",
            devices: [
                { id: 31, deviceType: "DRY" },
                { id: 30, deviceType: "WASH" },
            ],
        },
        {
            type: "pair",
            devices: [
                { id: 42, deviceType: "WASH" },
                { id: 43, deviceType: "DRY" },
            ],
        },
    ],
    [
        {
            type: "pair",
            devices: [
                { id: 29, deviceType: "DRY" },
                { id: 28, deviceType: "DRY" },
            ],
        },
        {
            type: "pair",
            devices: [
                { id: 40, deviceType: "DRY" },
                { id: 41, deviceType: "DRY" },
            ],
        },
    ],
    [
        {
            type: "pair",
            devices: [
                { id: 27, deviceType: "DRY" },
                { id: 26, deviceType: "DRY" },
            ],
        },
        { type: "empty" },
    ],
]
