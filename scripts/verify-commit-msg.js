import { readFileSync } from "fs"

const commitMsgFilePath = process.argv[2]

if (!commitMsgFilePath) {
    console.error("✖ 커밋 메시지에 접근할 수 없습니다.")
    process.exit(1)
}

const commitMessage = readFileSync(commitMsgFilePath, "utf8").trim()

const validateCommitMessage = (commitMessage) => {
    const [type, message] = commitMessage
        .split(" :: ")
        .map((token) => token.trim())

    return (
        ["feat", "fix", "chore", "style", "remove"].includes(type) &&
        message &&
        !message.includes(":")
    )
}

const result = validateCommitMessage(commitMessage)

if (!result) {
    console.error("✖ 커밋양식을 지키시오 → (feat|fix|chore|style) :: 메시지")
    process.exit(1)
}

process.exit(0)
