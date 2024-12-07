import * as dao from "./dao.js";
export default function AssignmentRoutes(app) {
  app.get("/api/assignments", async (req, res) => {
    const assignments = await dao.findAllAssignments();
    res.send(assignments);
  });

app.delete("/api/assignments/:aId", async (req, res) => {
    const { aId } = req.params;
    const status = await dao.deleteAssignment(aId);
    res.send(status);
  });

  app.put("/api/assignments/:aId", async (req, res) => {
    const { aId } = req.params;
    const assignmentUpdates = req.body;
    const status = await dao.updateAssignment(aId, assignmentUpdates);
    res.send(status);
  });
}

