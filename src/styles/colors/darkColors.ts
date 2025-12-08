export const darkColors = {
    Surface: "#242424",
    Main: {
        PrimaryContainer: "#2E2E3E",
        Main100: "#3D3E61",
        Main200: "#4C4D87",
        PrimaryFixed: "#5C5DAC",
        Main400: "#6A6BD1",
        Primary: "#6A6BD1",
        Main600: "#9B9DF8",
        Main700: "#ADAEF9",
        Main800: "#BDBFFA",
        OnPrimary: "#CFD0FB",
    },
    Gray: {
        Secondary: "#5C5A5F",
        SurfaceContainerLowest: "#6F6D72",
        SurfaceDim: "#79777C",
        SurfaceTint: "#848287",
        Gray400: "#8C8A8F",
        OnSecondary: "#9D9CA0",
        SurfaceContainerLow: "#AFADB1",
        SurfaceContainer: "#C6C5C7",
        SurfaceContainerHighest: "#DDDCDD",
        SurfaceContainerHigh: "#FBFBFC",
    },
    System: {
        InserveSurface: "#FFFFFF",
        OnSurface: "#000000",
    },
    Sub: {
        OnTertiary: "#364B42",
        Tertiary: "#75D09A",
        onError: "#3B2E2D",
        Error: "#E37B79",
    },
}

export type colorsKeyOfType = keyof typeof darkColors
