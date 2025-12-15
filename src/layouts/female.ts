import type { LayoutCell } from "../components"

export const femaleLayout: LayoutCell[][] = [
    [
        { type: "single", device: { id: 61, deviceType: "WASH" } },
        { type: "empty" },
    ],
    [
        { type: "single", device: { id: 60, deviceType: "WASH" } },
        {
            type: "pair",
            devices: [
                { id: 66, deviceType: "DRY" },
                { id: 67, deviceType: "DRY" },
            ],
        },
    ],
    [
        { type: "single", device: { id: 59, deviceType: "WASH" } },
        { type: "empty" },
    ],
    [
        { type: "single", device: { id: 58, deviceType: "WASH" } },
        { type: "empty" },
    ],
    [
        { type: "single", device: { id: 57, deviceType: "WASH" } },
        {
            type: "pair",
            devices: [
                { id: 64, deviceType: "DRY" },
                { id: 65, deviceType: "DRY" },
            ],
        },
    ],
    [
        { type: "single", device: { id: 56, deviceType: "WASH" } },
        { type: "empty" },
    ],
    [
        { type: "single", device: { id: 55, deviceType: "WASH" } },
        { type: "empty" },
    ],
    [
        { type: "single", device: { id: 54, deviceType: "WASH" } },
        {
            type: "pair",
            devices: [
                { id: 62, deviceType: "DRY" },
                { id: 63, deviceType: "DRY" },
            ],
        },
    ],
    [
        { type: "single", device: { id: 53, deviceType: "WASH" } },
        { type: "empty" },
    ],
    [
        { type: "single", device: { id: 52, deviceType: "WASH" } },
        { type: "empty" },
    ],
]
