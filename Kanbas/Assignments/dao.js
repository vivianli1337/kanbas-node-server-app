// import Database from "../Database/index.js";
import model from "./model.js";


// create

export function createAssignment(assignment) {
    // const newAssignment = { ...assignment, _id: Date.now().toString() };
    // Database.assignments = [...Database.assignments, newAssignment];
    // console.log(Database.assignments)
    // return newAssignment;
    delete assignment._id
    return model.create(assignment);

}

// retrieve
export function findAllAssignments() {
    // return Database.assignments;
    return model.find();

}

export function findAssignmentsForCourse(courseId) {
    // const { assignments } = Database;
    // const assignedAssignments = assignments.filter((assignment) =>
    //     courseId === assignment.course);
    // console.log(Database.assignments)
    const assignedAssignments =  model.find({course: courseId});
    return assignedAssignments;
}

//update 
export function updateAssignment(aId, assignmentUpdates) {
    // const { assignments } = Database;
    // const assignment = assignments.find((assignment) => assignment._id === aId);
    // Object.assign(assignment, assignmentUpdates);
    // return assignment;
    return model.updateOne({ _id: aId }, assignmentUpdates);
}


// delete
export function deleteAssignment(aId) {
    // const { assignments } = Database;
    // Database.assignments = assignments.filter((assignments) => assignments._id !== aId);
    return model.deleteOne({ _id: aId });
}
