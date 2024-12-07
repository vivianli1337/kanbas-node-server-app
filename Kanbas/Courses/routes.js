import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";


export default function CourseRoutes(app) {

    // assignment
    const findAssignmentsForCourses = async (req, res) => {
        let { courseId } = req.params;
        const assignments = await assignmentsDao.findAssignmentsForCourse(courseId);
        res.json(assignments)

    };

    // const createAssignment = (req, res) => {
    //     const currentCourse = req.session["currentCourse"];
    //     const newAssignment = courseDao.createCourse(req.body);
    //     dao.assignedAssignments(currentCourse._id, newAssignment._id);
    //     res.json(newAssignment);
    //   };


    // courses
    app.post("/api/courses", async (req, res) => {
        const course = await dao.createCourse(req.body);
        const currentUser = req.session["currentUser"];
        if (currentUser) {
            await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
        }

        res.json(course);
    });

    app.get("/api/courses", async (req, res) => {
        const courses = await dao.findAllCourses();
        res.send(courses);
    });
    app.delete("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const status = await dao.deleteCourse(courseId);
        res.send(status);
    });
    app.put("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        const status = await dao.updateCourse(courseId, courseUpdates);
        res.send(status);
    });

    // modules
    app.get("/api/courses/:courseId/modules", async (req, res) => {
        const { courseId } = req.params;
        const modules = await modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    });
    app.post("/api/courses/:courseId/modules", async (req, res) => {
        const { courseId } = req.params;
        const module = {
            ...req.body,
            course: courseId,
        };
        const newModule = await modulesDao.createModule(module);
        res.send(newModule);
    });



    // assignments
    app.post("/api/courses/:courseId/assignments", async (req, res) => {
        const { courseId } = req.params;
        // console.log(courseId)
        const assignment = {
            ...req.body,
            course: courseId,
        };
        // console.log(assignment)
        const newAssignment = await assignmentsDao.createAssignment(assignment);
        // console.log(newAssignment)
        res.send(newAssignment);
    });

    // assignments
    app.get("/api/courses/:courseId/assignments", findAssignmentsForCourses);
    // app.post("/api/users/current/assignments", createAssignment);


    // peopletable
    const findUsersForCourse = async (req, res) => {
        const { cid } = req.params;
        const users = await enrollmentsDao.findUsersForCourse(cid);
        res.json(users);
    };
    app.get("/api/courses/:cid/users", findUsersForCourse);

}

