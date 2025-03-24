export default function (content: string, splitter1 = " ", splitter2 = "_") {
    return content.split(splitter1).map((word) =>
        word
            .split(splitter2)
            .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
            .join(splitter1),
    );
}
