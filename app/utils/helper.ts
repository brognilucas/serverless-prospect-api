
function executeCalculation(percentages: unknown, object: unknown): number {
    const calculatedValues = Object.keys(percentages).map((key) => {
        return object[key] * percentages[key];
    })

    return calculatedValues.reduce((prev, next) => prev + next, 0);
}


export default {
    executeCalculation
}