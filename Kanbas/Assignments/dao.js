import Database from "../Database/index.js";

// create

export function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: Date.now().toString() };
    Database.assignments = [...Database.assignments, newAssignment];
    console.log(Database.assignments)
    return newAssignment;
}

// retrieve
export function findAllAssignments() {
    return Database.assignments;
}

export function findAssignmentsForCourse(courseId) {
    const { assignments } = Database;
    const assignedAssignments = assignments.filter((assignment) =>
        courseId === assignment.course);
    console.log(Database.assignments)
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
    const { assignments } = Database;
    Database.assignments = assignments.filter((assignments) => assignments._id !== aId);
}
