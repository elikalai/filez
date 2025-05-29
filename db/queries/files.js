import db from "#db/client";

export async function createFile(name, size, folderId){
const sql = `
INSERT INTO files
(name)
VALUES
($1)
RETURNING *
`;
const {
    rows: [file]
} = await db.query(sql, [name, size, folderId]);
return file;
}

export async function getFilesByFolderName(){
    const sql = `
    SELECT
    files.*,
    folders.name AS folder_name
    FROM
    files
    JOIN folders ON folders.id = files.folder_id
    `;
    const {
        rows: [files]
    } = await db.query(sql);
    return files;
}