import express from  "express";

const router = express.router();
export default router;

import { createFile } from "#db/queries/files";
import { getFoldersByIdWithFiles, getFolders } from "#db/queries/folders";

router.route("/").get(async(res,req)  => {
    const folders = await getFolders();
    res.send(folders);
});

router.param("id", async (req, res, next, id) => {
    const folder = await getFoldersByIdWithFiles(id);
    if (!folder) return res.status(404).send("folder not found");
    req.folder = folder;
    next();
});

router.route("/:id").get ((req, res) => {
    res.send(req.folder);
});

router.route("/:id/files").post(async (req, res) => {
    if (!req.body) return res.status(400).send("Request body is required.");
  
    const { name, size } = req.body;
    if (!name || !size)
      return res.status(400).send("Request body requires: name, size");
  
    const file = await createFile(name, size, req.folder.id);
    res.status(201).send(file);
  });

