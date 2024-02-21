import { DynamoDB } from "aws-sdk"
import crypto from "crypto"

export async function list(event, context) {
    const dynamodb = new DynamoDB({
        region: "ap-northeast-1"
    })

    try {
        const result = await dynamodb.scan({
            TableName: "tasks"
        }).promise()

        const tasks = result.Items.map((item) => {
            return {
                id: item.id.S,
                title: item.title.S
            }
        })
        return { tasks: tasks }
    }
    catch (error) {
        console.error("Error listing tasks:", error)
        return { error: "Failed to list tasks" }
    }
}

export async function post(event, context) {
    const requestBody = JSON.parse(event.body)

    const item = {
        id: { S: crypto.randomUUID() },
        title: { S: requestBody.title }
    }

    const dynamodb = new DynamoDB({
        region: "ap-northeast-1"
    })
    try {
        await dynamodb.putItem({
            TableName: "tasks",
            Item: item
        }).promise()

        return item
    }
    catch (error) {
        console.error("Error posting task:", error)
        return { error: "Failed to post task" }
    }
}
