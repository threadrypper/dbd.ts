/**
 * Creates a snowflake.
 * @param length the length.
 * @returns
 */
export function Snowflake(length = 15) {
    let str = "";
    while (length > 0) {
        str = `${str}${Math.floor(Math.random() * 9) + 1}`;
        length--;
    }
    return `FUNCTION=${str}`;
}
