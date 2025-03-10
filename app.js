const courseInfo = {
    id: 451,
    name: "Introduction to cooking",
  }


  const assignmentGroup = {
    id: 1234,
    name: "Three simple dishes using Eggs",
    course_id: 451,
    group_weight: 15,
    assignments: [
        {
            id: 1,
            name: "Omelet",
            due_at: "2023-01-25",
            points_possible: 50,
          },
        {
            id: 2,
            name: "Scrambled Eggs",
            due_at: "2023-02-27",
            points_possible: 150,
          },
        {
            id: 3,
            name: "Deviled Eggs",
            due_at: "3156-11-15",
            points_possible: 500,
          },
    ],
  }

  const learnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
          submitted_at: "2023-01-25",
          score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
          submitted_at: "2023-02-12",
          score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
          submitted_at: "2023-01-25",
          score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
          submitted_at: "2023-01-24",
          score: 140
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
          submitted_at: "2023-03-07",
          score: 140
        }
    }

    
  ]



// some helper functions

// calculate weighted average
let calculateLearnerAverage = (learner, assignmentGroup) => {
  let weightedScore = 0
  let totalPointsPossible = 0
  
  // use a for loop instead of forEach to allow break/continue
  for (let i = 0; i < assignmentGroup.assignments.length; i++) {
    const assignment = assignmentGroup.assignments[i];
    
    // find the learner's submission for the current assignment
    const submission = learnerSubmissions.find(
      (submission) => submission.learner_id === learner.learner_id && submission.assignment_id === assignment.id
    )

    // if no valid submission or the submission score is not a number, continue to the next assignment
    if (!submission || typeof submission.submission.score !== 'number') {
      continue
    }

    // calculate the normal score for the assignment
    const normalScore = (submission.submission.score / assignment.points_possible)
    // add weighted score, score * points_possible
    weightedScore += normalScore * assignment.points_possible
    // add the points_possible for this assignment to the totalPointsPossible
    totalPointsPossible += assignment.points_possible
  }

  // return the weighted average score as percent
  return (weightedScore / totalPointsPossible) * 100
};

// group submissions by learner_id 
const groupSubmissionsByLearnerId = (learnerSubmissions, assignments) => {

  // do not add assignment #3 to the new object as it is not due until the year 3156
  return Object.values(learnerSubmissions.reduce((accumulator, submission) => {
    // skip submission with assignment_id of 3
    if (submission.assignment_id === 3) {
      return accumulator
    }

    // find the corresponding assignment by assignment_id
    const assignment = assignments.find(assignment => assignment.id === submission.assignment_id)

    // if the learner_id does not exist in the accumulator, create a new entry for it
    if (!accumulator[submission.learner_id]) {
      accumulator[submission.learner_id] = {
        learner_id: submission.learner_id,
        assignments: [],
        scores: {} 
      }
    }

    // calculate the percentage for the assignment
    const percentage = (submission.submission.score / assignment.points_possible) * 100

    // add the submission to the learner's assignments
    accumulator[submission.learner_id].assignments.push({
      assignment_id: submission.assignment_id,
      submission: submission.submission
    })

    // add the percentage to the scores dictionary with the assignment_id as object key
    accumulator[submission.learner_id].scores[submission.assignment_id] = percentage

    return accumulator
  }, {}))
}


// console.log(groupSubmissionsByLearnerId)

let getLearnerData = (course, assignments, submissions) => {
  try {
    // check if the course ID matches the assignment's course ID
    if (assignments.course_id !== course.id) {
      throw new Error("Course ID does not match assignment course ID")
    }

    // group the submissions by learner_id 
    const groupedSubmissions = groupSubmissionsByLearnerId(submissions, assignments.assignments)

    // final output array
    const output = []


    // iterate through each learner and calculate their average score
    groupedSubmissions.forEach((learner) => {
    // calculate the weighted average for each learner
    const learnerAvg = calculateLearnerAverage(learner, assignments)

    // for each assignment completed by the learner, create an object with avg and assignment_id
    learner.assignments.forEach((assignment) => {
      const submission = learnerSubmissions.find(
        (submission) => submission.learner_id === learner.learner_id && submission.assignment_id === assignment.assignment_id
      )
      // add new object to output array
      output.push({
        learner_id: learner.learner_id,
        avg: learnerAvg,
        assignment_id: assignment.assignment_id,
      })
     })
    })

    return output
  } catch (error) {
    return error
  }
}



const finalOutput = getLearnerData(courseInfo, assignmentGroup, learnerSubmissions);
console.log(finalOutput)
