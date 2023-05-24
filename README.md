## Overview

This repository contains a workout tracking application that helps users organize their exercise routines and track their progress. The application consists of three major screens:

1. **Calendar View Screen** - Home screen that displays the calendar view.
2. **Exercise Add / Event Creation Screen** - Screen for adding exercises or creating events.
3. **Exercise Data Fill Screen** - Screen for filling in exercise data.

### Events and Muscle Sets

- A specific date is considered an `Event`.
- An Event becomes a filled Event when it contains exercise data. Filled Events are color-coded based on the corresponding muscle set(s). If multiple muscle sets are involved, the Event will have multiple color codes. Each Event can have a maximum of 3 selected muscle sets.
- There are 6 types of `Muscle Sets`:
  1. Chest
  2. Shoulder
  3. Back
  4. Abs
  5. Arms
  6. Legs

### Routines and Programs

- A group of events spanning one week is called a `Routine`.
- Multiple Routines form a `Program`.
- For example, if we consider the period from May 24th, 2023 to May 30th, 2023, it would be a Routine (a week of events).
- A Program is defined as N x Routine, where N represents the number of repeated Routines.
- If a specific Routine is repeated consistently for 3 times, the Program will span 3 weeks, from May 24th to June 13th.
- Each Program is distinguished by a unique background color.
- If a Program consists of more than one Routine, there is a special option to copy the first week's Routine to the subsequent Routines in that Program.

### Exercises and Data Entry

- Each `Exercise` is associated with specific data, which is displayed in the modal on the Exercise Data Fill Screen.
- Data such as sets, reps, and weights can be edited by the user, based on their performance.
- There is also an `Edit Note` feature to maintain notes for a specific exercise.

Feel free to explore and contribute to this project!