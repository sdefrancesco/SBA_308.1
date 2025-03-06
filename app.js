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
let calculateLearnerAverage = (submission) => {

}

// filter by learner id 
let filterByLearnerId = (assignments) => {

}

let getLearnerData = (course, assignments, submissions) => {
    try {
        let assignmentsArray
        if(assignments.course_id == course.id) {
            // proceed
            assignmentsArray = assignments.assignments.map((assignment) => {
                if(typeof assignment.points_possible === 'number') {
                    let assignmentSubmissions = submissions.filter((submission) => {
                        
                    });
                    
                } else {
                    throw new Error("Points Possible is not a number! So we can't get the average.")
                }
            })
            return assignmentsArray
        }
        throw new Error("Course ID does not match assignment course ID")
    } catch (error) {
        return error
    }
}

const result = getLearnerData(courseInfo, assignmentGroup, learnerSubmissions);
console.log(result)