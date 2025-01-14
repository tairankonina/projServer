import { connect } from "mongoose"

export function connectToDB() {
    connect(process.env.DB_url)
        .then(con => console.log("mongo db connected"))
        .catch(err => {
            console.log("cannot connect mongo db", err)
            process.exit(1)
        })
}