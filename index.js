const fs = require('fs')
const express = require('express')
const app = express()
const AWS = require("aws-sdk");
const s3 = new AWS.S3()

app.all('/', async (req, res) => {
    console.log("Just got a request!")
    let count = 0;



    //check if file exists in s3
    const params = {
        Bucket: "cyclic-shrimp-earmuffs-ap-northeast-2",
        Key: "count.txt"
    }

    try {
        const data = await s3.headObject(params).promise();
        console.log("File exists in s3")
    } catch (err) {
        console.log("File does not exist in s3");
        await s3.putObject({
            Body: count.toString(),
            Bucket: "cyclic-shrimp-earmuffs-ap-northeast-2",
            Key: "count.txt",
        }).promise();
    }

    
    count = await s3.getObject({
        Bucket: "cyclic-shrimp-earmuffs-ap-northeast-2",
        Key: "count.txt",
    }).promise()

    count = parseInt(count.Body.toString());
    count++

    await s3.putObject({
        Body: count.toString(),
        Bucket: "cyclic-shrimp-earmuffs-ap-northeast-2",
        Key: "count.txt",
    }).promise()

    res.send("count: " + count.toString())

})

app.listen(process.env.PORT || 3000)