import styled, { css } from "styled-components"
import { Text } from "../Text"
import { useRef } from "react"

type Option = "mine" | "status"

export function LaundryTabSwitch({
    value,
    onChange,
}: {
    value: Option
    onChange: (v: Option) => void
}) {
    const mineRef = useRef<HTMLButtonElement>(null)
    const statusRef = useRef<HTMLButtonElement>(null)

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "ArrowRight") {
            e.preventDefault()
            onChange("status")
            statusRef.current?.focus()
        }

        if (e.key === "ArrowLeft") {
            e.preventDefault()
            onChange("mine")
            mineRef.current?.focus()
        }
    }

    return (
        <Wrapper
            role="tablist"
            aria-label="세탁실 탭 선택"
            onKeyDown={onKeyDown}
        >
            <Slider $position={value} aria-hidden="true" />

            <TabButton
                ref={mineRef}
                role="tab"
                aria-selected={value === "mine"}
                tabIndex={value === "mine" ? 0 : -1}
                $active={value === "mine"}
                onClick={() => onChange("mine")}
            >
                <Text
                    font="button1"
                    color={value === "mine" ? "Main.Primary" : "Gray.Gray400"}
                >
                    내 세탁실
                </Text>
            </TabButton>

            <TabButton
                ref={statusRef}
                role="tab"
                aria-selected={value === "status"}
                tabIndex={value === "status" ? 0 : -1}
                $active={value === "status"}
                onClick={() => onChange("status")}
            >
                <Text
                    font="button1"
                    color={value === "status" ? "Main.Primary" : "Gray.Gray400"}
                >
                    세탁실 현황
                </Text>
            </TabButton>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 200px;
    height: 41px;
    background: ${({ theme }) => theme.colors.Gray.Secondary};
    border-radius: 8px;
    padding: 4px 8px;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Slider = styled.div<{ $position: Option }>`
    position: absolute;
    top: 4px;
    bottom: 4px;
    width: 88px;
    border-radius: 4px;

    background: ${({ theme }) => theme.colors.Surface};
    transition: transform 0.2s ease;

    ${({ $position }) =>
        $position === "mine"
            ? css`
                  transform: translateX(0px);
              `
            : css`
                  transform: translateX(96px);
              `}
`

const TabButton = styled.button<{ $active: boolean }>`
    width: 88px;
    height: 33px;
    border: none;
    background: transparent;
    z-index: 10;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors.Main.Primary};
        outline-offset: 2px;
        border-radius: 4px;
    }
`
