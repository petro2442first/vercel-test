import { isObject } from "./is-object";

export const prepareParsedJson = (object) => {
    const copiedObject = JSON.parse(JSON.stringify(object));
    return recursiveParseObject(copiedObject);
}

function recursiveParseObject(preparedObject) {
    for (const key in preparedObject) {
        if (Object.hasOwnProperty.call(preparedObject, key)) {
            const element = preparedObject[key];

            if (Array.isArray(element) && element.length === 1) {
                preparedObject[key] = recursiveParseObject(element[0]);   
            }

            if (Array.isArray(element) && element.length > 1) {
                element.forEach((item, index) => {
                    element[index] = recursiveParseObject(item);
                })
            }

            if (!Array.isArray(element) && isObject(element)) {
                recursiveParseObject(element);
            }
        }
    }

    return preparedObject;
}