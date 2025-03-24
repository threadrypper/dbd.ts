export default function (number: number) {
    const arr: number[] = [];
    while (number) {
        const got = number >= 100 ? 100 : number;
        number -= got;
        arr.push(got);
    }
    return arr;
}
