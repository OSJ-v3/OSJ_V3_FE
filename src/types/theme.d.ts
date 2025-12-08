export interface ColorMain {
    PrimaryContainer: string
    Main100: string
    Main200: string
    PrimaryFixed: string
    Main400: string
    Primary: string
    Main600: string
    Main700: string
    Main800: string
    OnPrimary: string
}

export interface ColorGray {
    Secondary: string
    SurfaceContainerLowest: string
    SurfaceDim: string
    SurfaceTint: string
    Gray400: string
    OnSecondary: string
    SurfaceContainerLow: string
    SurfaceContainer: string
    SurfaceContainerHighest: string
    SurfaceContainerHigh: string
}

export interface ColorSystem {
    InserveSurface: string
    OnSurface: string
}

export interface ColorSub {
    OnTertiary: string
    Tertiary: string
    onError: string
    Error: string
}

export interface Colors {
    Surface: string
    Main: ColorMain
    Gray: ColorGray
    System: ColorSystem
    Sub: ColorSub
}

export interface AppTheme {
    mode: "light" | "dark"
    colors: Colors
}
