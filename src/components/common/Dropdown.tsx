import { type ComponentProps, useState, useRef, useEffect, useId } from "react"
import styled from "styled-components"
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
    const id = useId()
    const wrapperRef = useRef<HTMLDivElement>(null)

    const [open, setOpen] = useState(false)
    const [highlighted, setHighlighted] = useState<number>(-1)

    const selectedIndex = options.findIndex((o) => o.value === value)
    const selectedLabel = options[selectedIndex]?.label ?? ""

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target as Node)
            ) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () =>
            document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
        if (!open && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault()
            setOpen(true)
            setHighlighted(selectedIndex >= 0 ? selectedIndex : 0)
            return
        }

        if (!open) return

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault()
                setHighlighted((prev) =>
                    prev < options.length - 1 ? prev + 1 : 0,
                )
                break
            case "ArrowUp":
                e.preventDefault()
                setHighlighted((prev) =>
                    prev > 0 ? prev - 1 : options.length - 1,
                )
                break
            case "Enter":
                e.preventDefault()
                if (highlighted >= 0) {
                    onChange?.(options[highlighted].value)
                    setOpen(false)
                }
                break
            case "Escape":
                setOpen(false)
                break
        }
    }

    return (
        <DropdownFrame ref={wrapperRef} style={style}>
            {label && (
                <Text font="subTitle2" color="System.InverseSurface">
                    {label}
                </Text>
            )}

            <DropdownButton
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={id}
                onClick={() => setOpen((v) => !v)}
                onKeyDown={handleKeyDown}
            >
                <SelectedText $placeholder={!selectedLabel}>
                    {selectedLabel || placeholder}
                </SelectedText>
                <Arrow $open={open} />
            </DropdownButton>

            {open && (
                <OptionsLayer id={id} role="listbox">
                    {options.map((opt, idx) => (
                        <OptionItem
                            key={opt.value}
                            role="option"
                            aria-selected={value === opt.value}
                            $highlighted={idx === highlighted}
                            onMouseEnter={() => setHighlighted(idx)}
                            onClick={() => {
                                onChange?.(opt.value)
                                setOpen(false)
                            }}
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

const DropdownButton = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-radius: 12px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.Gray.Secondary};
    border: 1px solid ${({ theme }) => theme.colors.Gray.SurfaceContainerLowest};

    &:focus-visible {
        outline: none;
        border-color: ${({ theme }) => theme.colors.Main.Primary};
    }
`

const SelectedText = styled.span<{ $placeholder: boolean }>`
    font-size: 16px;
    color: ${({ theme, $placeholder }) =>
        $placeholder
            ? theme.colors.Gray.OnSecondary
            : theme.colors.System.InverseSurface};
`

const OptionsLayer = styled.ul`
    position: absolute;
    top: calc(100% - 10px);
    width: 100%;
    background-color: ${({ theme }) => theme.colors.Gray.Secondary};
    border-radius: 12px;
    padding: 8px 0;
    list-style: none;
    border: 1px solid ${({ theme }) => theme.colors.Gray.SurfaceContainerLowest};
    z-index: 10;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.12);
`

const OptionItem = styled.li<{ $highlighted: boolean }>`
    padding: 12px 16px;
    cursor: pointer;
    font-size: 16px;
    background-color: ${({ theme, $highlighted }) =>
        $highlighted
            ? theme.colors.Gray.SurfaceContainerLowest
            : "transparent"};
    color: ${({ theme }) => theme.colors.System.InverseSurface};
`

const Arrow = styled.span<{ $open: boolean }>`
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: ${({ $open, theme }) =>
        $open
            ? "0px solid transparent"
            : `6px solid ${theme.colors.Gray.OnSecondary}`};
    border-bottom: ${({ $open, theme }) =>
        $open
            ? `6px solid ${theme.colors.Gray.OnSecondary}`
            : "0px solid transparent"};
`
