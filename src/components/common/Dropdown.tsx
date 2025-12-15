import { type ComponentProps, useState, useRef, useEffect } from "react"
import styled, { useTheme } from "styled-components"
import { Text } from "./Text"

type Option<T extends string> = {
    label: string
    value: T
}

type Props<T extends string> = {
    label?: string
    placeholder?: string
    options: Option<T>[]
    value?: T
    onChange?: (value: T) => void
} & Omit<ComponentProps<"div">, "onChange">

export function Dropdown<T extends string>({
    label,
    placeholder,
    options,
    value,
    onChange,
    style,
}: Props<T>) {
    const theme = useTheme()
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLUListElement>(null)

    const selectedLabel = options.find((o) => o.value === value)?.label || ""

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <DropdownFrame style={style}>
            {label && (
                <Text font="subTitle2" color="System.InverseSurface">
                    {label}
                </Text>
            )}

            <DropdownLabel $theme={theme} onClick={() => setOpen(!open)}>
                <SelectedText $isPlaceholder={!selectedLabel} $theme={theme}>
                    {selectedLabel || placeholder}
                </SelectedText>

                <Arrow $theme={theme} $open={open} />
            </DropdownLabel>

            {open && (
                <OptionsLayer $theme={theme} ref={ref}>
                    {options.map((opt) => (
                        <OptionItem
                            key={opt.value}
                            onClick={() => {
                                onChange?.(opt.value)
                                setOpen(false)
                            }}
                            $theme={theme}
                        >
                            {opt.label}
                        </OptionItem>
                    ))}
                </OptionsLayer>
            )}
        </DropdownFrame>
    )
}

const DropdownFrame = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    position: relative;
`

const DropdownLabel = styled.div<{ $theme: any }>`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-radius: 12px;
    background-color: ${({ $theme }) => $theme.colors.Gray.Secondary};
    border: 1px solid
        ${({ $theme }) => $theme.colors.Gray.SurfaceContainerLowest};
    transition: 200ms;
    cursor: pointer;

    &:focus-within,
    &:hover {
        border: 1px solid ${({ $theme }) => $theme.colors.Main.Primary};
    }
`

const SelectedText = styled.div<{ $theme: any; $isPlaceholder: boolean }>`
    font-size: 16px;
    color: ${({ $theme, $isPlaceholder }) =>
        $isPlaceholder
            ? $theme.colors.Gray.OnSecondary
            : $theme.colors.System.InverseSurface};
`

const OptionsLayer = styled.ul<{ $theme: any }>`
    position: absolute;
    top: calc(100% - 10px);
    width: 100%;
    background-color: ${({ $theme }) => $theme.colors.Gray.Secondary};
    border-radius: 12px;
    padding: 8px 0;
    list-style: none;
    border: 1px solid
        ${({ $theme }) => $theme.colors.Gray.SurfaceContainerLowest};
    overflow: hidden;
    z-index: 10;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.12);
`

const OptionItem = styled.li<{
    $theme: any
}>`
    padding: 12px 16px;
    cursor: pointer;
    font-size: 16px;
    color: ${({ $theme }) => $theme.colors.System.InverseSurface};
    background-color: transparent;
    transition: 200ms;

    &:hover {
        background-color: ${({ $theme }) =>
            $theme.colors.Gray.SurfaceContainerLowest};
    }
`

const Arrow = styled.div<{ $theme: any; $open: boolean }>`
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: ${({ $open, $theme }) =>
        $open
            ? "0px solid transparent"
            : `6px solid ${$theme.colors.Gray.OnSecondary}`};
    border-bottom: ${({ $open, $theme }) =>
        $open
            ? `6px solid ${$theme.colors.Gray.OnSecondary}`
            : "0px solid transparent"};
    transition: 200ms;
`
