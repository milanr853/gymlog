const exerciseData = {
    id: 'date',
    muscleSet: 'Legs',
    exerciseName: 'Leg press',
    pr: "60",
    currentAvg: "50",
    pastAvg: "30",
    oneRM: "58",
    note: ["fgbbf", "gbtbfn fgsrtsrtsrtn tbrtbtrrt rv", "zfgfnttr"],
    sets: 4,
    reps: [6, 6, 8, 6],
    weights: [30, 35, 40, 45]
}

// exercise data
export const exerciseDataApi = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(exerciseData)
        reject(new Error("Custom error"));
    }, 3000)
})

