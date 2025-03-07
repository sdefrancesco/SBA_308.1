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
let calculateLearnerAverage = (learner) => {
  let scores = 0
  let totalAssignments = learner.assignments.length  
  
  learner.assignments.forEach((assignment) => {
    if (assignment.submission && typeof assignment.submission.score === 'number') {
      scores += assignment.submission.score
    }
  })

  if (totalAssignments === 0) {
    return 0
  }

  return scores / totalAssignments
}

// group submissions by learner_id 
const groupSubmissionsByLearnerId = Object.values(learnerSubmissions.reduce((accumulator, submission) => {
  // If the learner_id does not exist in the accumulator, create a new entry for it
  if (!accumulator[submission.learner_id]) {
    accumulator[submission.learner_id] = {
      learner_id: submission.learner_id,
      assignments: [] 
    }
  }
  
  // push the each submission into their assignments array
  accumulator[submission.learner_id].assignments.push({
    assignment_id: submission.assignment_id,
    submission: submission.submission  
  });
  
  return accumulator
}, {}))

// console.log(groupSubmissionsByLearnerId)

let getLearnerData = (course, assignments, submissions) => {
    // validation
    try {
        let assignmentsArray
        if(assignments.course_id == course.id) {
            // proceed to next step and check the type of points possible for each assignment that it is a number and not a string
            const groupedSubmissions =  groupSubmissionsByLearnerId
            
            groupedSubmissions.forEach((learner) => {
              learner.avg = calculateLearnerAverage(learner)
            })
            return groupedSubmissions
        }
        throw new Error("Course ID does not match assignment course ID")
    } catch (error) {
        return error
    }
}

const result = getLearnerData(courseInfo, assignmentGroup, learnerSubmissions);
console.log(result)
