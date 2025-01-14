import { productModel } from "../modles/product.js"

export async function getAll(req, res) {
    try {
        let data = await productModel.find();
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot get all product", message: err.message })
    }
}

export async function getById(req, res) {
    let { id } = req.params;
    try {
        let data = await productModel.findById(id);
        if (!data)
            return res.status(404).json({ title: "cannot get product by id", message:"cannot get by id" })

        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot get all users", message: err.message })
    }
}


export async function update(req, res) {
    let { id } = req.params;
    try {
        let data = await productModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!data)
            return res.status(404).json({ title: "cannot update product", message: "cannot update by id" })

        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot update product", message: err.message })
    }
}


export async function deleteById(req, res) {
    let { id } = req.params;
    try {
        let data = await productModel.findByIdAndDelete(id);
        if (!data)
            return res.status(404).json({ title: "cannot delet product", message: "cannot delet by id" })

        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot delete product", message: err.message })
    }
}


export async function add(req, res) {
    const { body } = req;

    // בדיקת נתונים
    if (!body.name || !body.price) {
        return res.status(400).json({
            title: "Cannot add product",
            message: "Missing required fields: name and price"
        });
    }

    try {
        // יצירת מוצר חדש
        const newProduct = await productModel.create({
            name: body.name,
            price: body.price
        });

        res.status(201).json(newProduct); // מחזיר את המוצר שנוסף
    } catch (err) {
        console.error(err);
        res.status(500).json({
            title: "Cannot add product",
            message: err.message
        });
    }
}






