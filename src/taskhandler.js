import { DynamoDB } from "aws-sdk"
import crypto from "crypto"

export async function post(event, context) {
    const requestBody = JSON.parse(event.body)
    
    const item = {
        id: { S: crypto.randomUUID() },
        title: { S: requestBody.title }
    }
    
    const dynamodb = new DynamoDB({
        region: "ap-northeast-1"
    })
    
    await dynamodb.putItem({
        TableName: "tasks",
        Item: item
    }).promise()
    
    return item
}