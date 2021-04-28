import snsLambda from './sns';
import sesLambda from './ses';

import { PayloadType } from '../dynamodb';

exports.handler = async(event: PayloadType) => {

    //quit from here
    if (!event.operationSuccessful) {
        return { message: "operation not successful" }
    }
    //otherwise goes


    //execute lambdafunctions in parallel
    return await (
        snsLambda(event) &&
        sesLambda(event)
    )
}