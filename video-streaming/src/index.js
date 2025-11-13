const express = require("express");
const fs = require("fs");
const app = express();
const port = 80;
const path = require("path");

//
// Throws an error if the PORT environment variable is missing.
//
if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}
//
// Extracts the PORT environment variable.
//
const PORT = process.env.PORT;

app.get("/video", async (req, res) => {
    const videoPath = path.join(__dirname, "../videos/SampleVideo_1280x720_1mb.mp4");
    const stats = await fs.promises.stat(videoPath);


    res.writeHead(200, {
        "Content-Length": stats.size,
        "Content-Type": "video/mp4",
    });
    fs.createReadStream(videoPath).pipe(res);
});

//
// Starts the HTTP server.
//
app.listen(port, () => {
    console.log(`Microservice listening on port ${port}, point your browser at http://localhost:${port}/video`);
});