export function delay(time = 500, randomOffset = 100) {
    const finalTime = time + Math.floor(Math.random() * randomOffset);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, finalTime);
    });
}
