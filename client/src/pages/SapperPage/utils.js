export const getRandomNumbers = (count, limit) => {
    let _c = 0
    const arrRandom = []
    while (_c < count) {
        const randomId = Math.floor(Math.random() * limit)
        if (!arrRandom.find((item) => item === randomId)) {
            arrRandom.push(randomId)
            _c++
        }
    }
    return arrRandom
}
