export const lightColors = {
    Surface: "#FFFFFF",
    Main: {
        PrimaryContainer: "#eef8ff",
        Main100: "#B3DFFF",
        Main200: "#80CAFF",
        PrimaryFixed: "#4DB4FF",
        Main400: "#26A4FF",
        Primary: "#0094FF",
        Main600: "#008CFF",
        Main700: "#0081FF",
        Main800: "#0077FF",
        OnPrimary: "#0065FF",
    },
    Gray: {
        Secondary: "#f6f6f6",
        SurfaceContainerLowest: "#DDDCDD",
        SurfaceDim: "#C6C5C7",
        SurfaceTint: "#AFADB1",
        Gray400: "#9D9CA0",
        OnSecondary: "#8C8A8F",
        SurfaceContainerLow: "#848287",
        SurfaceContainer: "#79777C",
        SurfaceContainerHighest: "#6F6D72",
        SurfaceContainerHigh: "#5C5A60",
    },
    System: {
        InverseSurface: "#000000",
        OnSurface: "#ffffff",
    },
    Sub: {
        OnTertiary: "#f0ffeb",
        Tertiary: "#62AE55",
        onError: "#fff6f6",
        Error: "#FF3B32",
    },
}

export type Colors = typeof lightColors
