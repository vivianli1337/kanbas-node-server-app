import Database from "../Database/index.js";

// create

export function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: Date.now().toString() };
    Database.assignments = [...Database.assignments, newAssignment];
    return newAssignment;
}


// retrieve
export function findAllAssignments() {
    return Database.assignments;
}

export function findAssignmentsForCourses(aId) {
    const { assignments, courses } = Database;
    const assignedAssignments = assignments.filter((assignments) =>
        assignments.some((assignments) => assignments._id === aId && courses._id === assignments.courses));
    return assignedAssignments;
}


//update 
export function updateAssignment(aId, assignmentUpdates) {
    const { assignments } = Database;
    const assignment = assignments.find((assignment) => assignment._id === aId);
    Object.assign(assignment, assignmentUpdates);
    return assignment;
  }
  

// delete
export function deleteAssignment(aId) {
    const { assignments, courses } = Database;
    Database.assignments = assignments.filter((assignments) => assignments._id !== aId);
  }
  