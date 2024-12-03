import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";


export default function CourseRoutes(app) {

    // assignment
    const findAssignmentsForCourses = (req, res) => {
        let { courseId } = req.params;
        const assignments = assignmentsDao.findAssignmentsForCourse(courseId);
        res.json(assignments)
   
    };

    // const createAssignment = (req, res) => {
    //     const currentCourse = req.session["currentCourse"];
    //     const newAssignment = courseDao.createCourse(req.body);
    //     dao.assignedAssignments(currentCourse._id, newAssignment._id);
    //     res.json(newAssignment);
    //   };
    

    // courses
    app.get("/api/courses", (req, res) => {
        const courses = dao.findAllCourses();
        res.send(courses);
    });
    app.delete("/api/courses/:courseId", (req, res) => {
        const { courseId } = req.params;
        const status = dao.deleteCourse(courseId);
        res.send(status);
    });
    app.put("/api/courses/:courseId", (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        const status = dao.updateCourse(courseId, courseUpdates);
        res.send(status);
    });
    app.get("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const modules = modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    });
    app.post("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const module = {
            ...req.body,
            course: courseId,
        };
        const newModule = modulesDao.createModule(module);
        res.send(newModule);
    });



    // assignments
    app.post("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        // console.log(courseId)
        const assignment = {
          ...req.body,
          course: courseId,
        };
        // console.log(assignment)
        const newAssignment = assignmentsDao.createAssignment(assignment);
        // console.log(newAssignment)
        res.send(newAssignment);
      });
    
    // assignments
    app.get("/api/courses/:courseId/assignments", findAssignmentsForCourses);
    // app.post("/api/users/current/assignments", createAssignment);


}

