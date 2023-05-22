const exerciseData = {
    id: 'date',
    muscleSet: 'Legs',
    exerciseName: 'Leg press',
    pr: "60",
    currentAvg: "50",
    pastAvg: "30",
    oneRM: "58",
    note: `fdddrrb
erergerg
dtbebererg
erererggweg
`,
    sets: 4,
    perform: [{ set: 1, rep: 8, weight: 30 }, { set: 2, rep: 8, weight: 35 }, { set: 3, rep: 6, weight: 40 }]
}

// get api - exercise data
export const exerciseDataApi = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(exerciseData)
        reject(new Error("Custom error"));
    }, 3000)
})

