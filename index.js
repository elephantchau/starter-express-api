const fs = require('fs')
const express = require('express')
const app = express()
app.all('/', (req, res) => {
    console.log("Just got a request!")
    let count = 0;

    if (!fs.existsSync('count.txt')) {
        fs.writeFileSync('count.txt', count.toString());
    }

    fs.readFile('count.txt', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            count = parseInt(data);
            count++
            fs.writeFile('count.txt', count.toString(), (err) => {
                if (err) {
                    console.log(err)
                } else {
                    res.send("You are visitor number " + count)
                }
            })
        }
    })
})

app.listen(process.env.PORT || 3000)