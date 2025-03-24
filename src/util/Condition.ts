import { OperatorType } from "../typings/interfaces";

/**
 * Creates a condition.
 * @param value1 The first value.
 * @param operator The operator.
 * @param value2 The second value.
 * @returns
 */
export function Condition(
    value1: string | number,
    operator: OperatorType,
    value2: string | number,
) {
    if (["<=", ">=", "<", ">"].includes(operator)) {
        value1 = Number(value1);
        value2 = Number(value2);
        if (isNaN(value2) || isNaN(value1)) return false;
    }
    
    if (operator === "!=") {
        if (value1 === value2) return false;
    } else if (operator === "==") {
        if (value1 !== value2) return false;
    } else if (operator === ">") {
        if (value1 <= value2) return false;
    } else if (operator === "<") {
        if (value1 >= value2) return false;
    } else if (operator === "<=") {
        if (value1 > value2) return false;
    } else {
        if (value1 < value2) return false;
    }
    
    return true;
}
