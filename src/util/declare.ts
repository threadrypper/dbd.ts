import { FunctionExecutionData } from "../typings/interfaces";
export default function (d: FunctionExecutionData, data: Record<string, any>) {
    Object.entries(data).map((arr) => {
        d.keywords[arr[0]] = arr[1];
    });
}
