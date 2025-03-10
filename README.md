<!-- Read me for Sebastian DeFrancesco SBA 308.1 -->
run the file by typing 'node app' to run the app.js file in the console.

the final output should be an array of objects containing a learner_id, assignment_id, and weighted avg.

the final output should look like this: 

[
  { learner_id: 125, avg: 85.28571428571429, assignment_id: 1 },
  { learner_id: 125, avg: 85.28571428571429, assignment_id: 2 },
  { learner_id: 132, avg: 140, assignment_id: 1 },
  { learner_id: 132, avg: 140, assignment_id: 2 }
]


<!-- how i achieved this result from the given data -->
i started by creating the get learner data function that takes 3 arguments, the course, assignments, and submissions so i can validate and compare in order to get the final array of objects.

i then validated to check if the assignments course id was equal to the course id inside a try/catch block, if the two values are not equal, we throw a new arror stating:

    "Course ID does not match assignment course ID"

then i created a helper function that would group the submissions by the learner id to add some structure and organization. (im not sure if i did this properly but the final output works).

inside this helper function i used the .reduce method the created a new object for each learner with the same id and adding the correct assignment to them as an array. I also made sure to not include assignments that were submitted that were not yet dude into the final output by skipping over assignments with the id of 3.

i then created another helper function to calculate the weighted average called 'calculateLearnerAverage' which sets totalpointspossible and weightedscore at 0 so we can add to that throughout the function.

i then added some validation to check the type of score and if it was a number

for the final output i used both these functions to return values allowing them to be reusable

i struggled with this assignment and took alot of research for me, but im glad to have been able to get to the correct output. :)