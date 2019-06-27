import * as dynamoDbLib from '../libs/dynamo-lib';
import { success, failure } from '../libs/response-lib';

export async function main(event, context){
    console.log(context)
    const params = {
        TableName: "notes",
        // 'Key' defines the partition key and sort key of the item to be retrieved
        // - 'userId': Identity Pool identity id of the authenticated user
        // - 'noteId': path parameter

        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            notesId: event.pathParameters.id
        }
    };

    try {
        const result = await dynamoDbLib.call("get", params);
        if(result.Item){
            return success(result.Item);
        } else {
            return failure({status: true, error: "Item not found."});
        }
    } catch (e) {
        console.log("error", e);
        return failure({status: false});
    }
}

// in get-event.json
//make sure to reference correct id made by AWS