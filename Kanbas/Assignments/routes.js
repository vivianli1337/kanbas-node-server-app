import * as dao from "./dao.js";
export default function AssignmentRoutes(app) {
  app.get("/api/assignments", (req, res) => {
    const assignments = dao.findAllAssignments();
    res.send(assignments);
  });

app.delete("/api/assignments/:aId", (req, res) => {
    const { aId } = req.params;
    const status = dao.deleteAssignment(aId);
    res.send(status);
  });

  app.put("/api/assignments/:aId", (req, res) => {
    const { aId } = req.params;
    const assignmentUpdates = req.body;
    const status = dao.updateAssignment(aId, assignmentUpdates);
    res.send(status);
  });
}

