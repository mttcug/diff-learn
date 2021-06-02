export default function (sel, data, children, text, elem) {
    const key = data.key
    return {
        sel,
        data,
        children,
        elem,
        text,
        key
    }
}