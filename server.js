const express = require('express');
const app = express();

//aquí le decimos que use los archivos estàticos
//y que se muestran al llamar a la ruta '/'
app.use("/static", express.static(__dirname + '/public'));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

//aquì le decimos al framework desde que puerto
app.listen(3000, () => {
    console.log("Listening on 3000");
});
