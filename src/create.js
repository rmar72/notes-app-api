import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamo-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {
    // this fn just catches our data as event and sets up the params for us to send in the try down below
    const data = JSON.parse(event.body);
    const params = {
        TableName: "notes",
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            notesId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now()
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch (e) {
        console.log(e);
        return failure({ status: false });
    }
}