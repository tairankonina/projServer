import { userModel } from "../modles/user.js";


export async function getAll(req, res) {
    try {
        let data = await userModel.find();
        res.json(data);
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot get all users", message: err.message })
    }
}


export async function getById(req, res) {
    let { id } = req.params;
    try {
        let data = await userModel.findById(id);
        if (!data)
            return res.status(404).json({ title: "cannot find by id", message: "user with such id not found " })
        res.json(data);
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot get all users", message: err.message })
    }
}


export async function update(req, res) {
    let { id } = req.params;
    try {
        // סינון הסיסמה מתוך הבקשה
        const { password, ...fieldsToUpdate } = req.body;

        let data = await userModel.findByIdAndUpdate(id, fieldsToUpdate, { new: true });
        if (!data)
            return res.status(404).json({ title: "Cannot find by ID", message: "User with such ID not found" });

        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ title: "Cannot update user", message: err.message });
    }
}


export async function updatePassword(req, res) {
    let { id } = req.params;
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ title: "Cannot update password", message: "Password is required" });
    }

    try {
        // עדכון הסיסמה בלבד
        // const hashedPassword = await findById(id); // אם אתה משתמש ב-bcrypt כדי לאבטח סיסמאות
        let user = await userModel.findByIdAndUpdate(id, { password: password }, { new: true });

        if (!user)
            return res.status(404).json({ title: "Cannot find by ID", message: "User with such ID not found" });

        res.json({ title: "Password updated successfully", user });
    } catch (err) {
        console.log(err);
        res.status(400).json({ title: "Cannot update password", message: err.message });
    }
}



export async function signUp(req, res) {
    if (!req.body.name || !req.body.email || !req.body.password)
        return res.status(404).json({ title: "cmissing parameters", message: "username email password phone are required " })

    try {
        let newwUser = new userModel(req.body);
        await newwUser.save();
        res.json(newwUser)
    }

    catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot add", message: err.message })
    }

}


export async function Login(req, res) {
    try {
        let data = await userModel.findOne({
            password: req.body.password, username: req.body.username
        });
        if (!data)
            return res.status(404).json({ title: "cannot find user with such details", message: "wrong username or password " })
        res.json(data);
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot log in user", message: err.message })
    }
}


export async function deleteById(req, res) {
    let { id } = req.params;
    try {
        let data = await userModel.findByIdAndDelete(id);
        if (!data)
            return res.status(404).json({ title: "cannot delet product", message: "cannot delet by id" })

        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot delete product", message: err.message })
    }
}
