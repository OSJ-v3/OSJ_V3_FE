import styled from "styled-components"

export function Toggle({
    value,
    onChange,
}: {
    value: boolean
    onChange: (v: boolean) => void
}) {
    return (
        <Switch $on={value} onClick={() => onChange(!value)}>
            <Thumb $on={value} />
        </Switch>
    )
}

const Switch = styled.div<{ $on: boolean }>`
    width: 60px;
    height: 30px;
    border-radius: 50px;
    padding: 3px;
    cursor: pointer;

    background: ${({ theme, $on }) =>
        $on ? theme.colors.Main.Primary : theme.colors.Gray.SurfaceContainer};

    display: flex;
    align-items: center;

    transition: background 0.25s ease;
`

const Thumb = styled.div<{ $on: boolean }>`
    width: 26px;
    height: 26px;
    background: white;
    border-radius: 50%;
    transition: transform 0.25s ease;

    transform: ${({ $on }) => ($on ? "translateX(29px)" : "translateX(0)")};
`
