import styled, { css } from "styled-components"
import { Text } from "../../common/Text"

type Option = "mine" | "status"

export function LaundryTabSwitch({
    value,
    onChange,
}: {
    value: Option
    onChange: (v: Option) => void
}) {
    return (
        <Wrapper>
            <Slider $position={value} />

            <TabButton
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

const Slider = styled.div<{ $position: "mine" | "status" }>`
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

    color: ${({ theme, $active }) =>
        $active ? theme.colors.Main.Primary : theme.colors.Gray.Gray400};

    display: flex;
    align-items: center;
    justify-content: center;
`
