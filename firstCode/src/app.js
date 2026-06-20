const express =  require('express');

const app = express();
app.use(express.json());

const notes = [];

//POST request :
app.post('/notes', (req,res) => {
    notes.push(req.body);
    res.status(201).json(
        {
            message : "Note created successfully"
        }
    )

});

// GET request :

app.get("/notes",(req,res) => {
    res.status(200).json(
        {
            message : "Data fetched successfully",
            notes : notes
        }
    )
})

// DELETE request :
app.delete("/notes/:index",(req,res) => {
    const index = req.params.index;
    delete notes[ index ];

    res.status(200).json(
        {
            message : "note deleted successfully"
        }
    )
})

// PATCH request :
app.patch("/notes/:index", (req,res) => {

    const index = req.params.index;
    const description = req.body.description;

    notes[ index ].description = description;

    res.status(200).json(
        {
            message : "note updated successfully"
        }
    )
})

module.exports = app;