export default function phonePattern(e) {
    let value = e.currentTarget.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length > 2) value = value.slice(0, 2) + " " + value.slice(2);
    if (value.length > 6) value = value.slice(0, 6) + " " + value.slice(6);
    if (value.length > 9) value = value.slice(0, 9) + " " + value.slice(9);
    e.target.value = value;
};