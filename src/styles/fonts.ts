export const Fonts: { [key in any]: React.CSSProperties } = {
    caption: {
        fontSize: "12px",
        fontWeight: 400,
    },
    label: {
        fontSize: "12px",
        fontWeight: 500,
    },
    heading1: {
        fontSize: "42px",
        fontWeight: 600,
    },
    heading2: {
        fontSize: "32px",
        fontWeight: 600,
    },
    heading3: {
        fontSize: "24px",
        fontWeight: 600,
    },
    heading4: {
        fontSize: "20px",
        fontWeight: 600,
    },
    subTitle1: {
        fontSize: "18px",
        fontWeight: 600,
    },
    subTitle2: {
        fontSize: "16px",
        fontWeight: 600,
    },
    subTitle3: {
        fontSize: "14px",
        fontWeight: 600,
    },
    body1: {
        fontSize: "14px",
        fontWeight: 500,
    },
    body2: {
        fontSize: "12px",
        fontWeight: 500,
    },
    body3: {
        fontSize: "10px",
        fontWeight: 500,
    },
    button1: {
        fontSize: "16px",
        fontWeight: 500,
    },
    button2: {
        fontSize: "12px",
        fontWeight: 500,
    },
} as const

export type fontsKeyOfType = keyof typeof Fonts
