import { orderModel } from "../modles/order.js"; // תיקון שם התיקייה מ-"modles" ל-"models"

export async function getAll(req, res) {
    try {
        let data = await orderModel.find();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(400).json({ title: "Cannot get all products", message: err.message });
    }
}

export async function getById(req, res) {
    let { userId } = req.params;
    try {
        if (!userId) {
            return res.status(400).json({ title: "Invalid request", message: "User ID is required" });
        }

        let data = await orderModel.find({ userId: userId });
        if (!data || data.length === 0) {
            return res.status(404).json({ title: "Cannot get product by ID", message: "No data found for this ID" });
        }

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(400).json({ title: "Cannot get user by ID", message: err.message });
    }
}

export async function update(req, res) {
    let { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ title: "Invalid request", message: "ID is required" });
        }

        let data = await orderModel.findByIdAndUpdate(
            id,
            { $set: { getOff: true } },
            { new: true }
        );

        if (!data) {
            return res.status(404).json({ title: "Cannot update product", message: "No data found for this ID" });
        }

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(400).json({ title: "Cannot update product", message: err.message });
    }
}

export async function deleteById(req, res) {
    let { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ title: "Invalid request", message: "ID is required" });
        }

        let data = await orderModel.findById(id);
        if (!data) {
            return res.status(404).json({ title: "Cannot delete product", message: "No data found for this ID" });
        }

        if (data.getOff) {
            return res.status(400).json({ title: "Cannot delete", message: "Order already getOff" });
        }

        let deletedData = await orderModel.findByIdAndDelete(id);
        res.json(deletedData);
    } catch (err) {
        console.error(err);
        res.status(400).json({ title: "Cannot delete product", message: err.message });
    }
}

export async function add(req, res) {
    let { body } = req;
    try {
        if (!body.userId || !body.product || !body.finalPrice) {
            return res.status(400).json({ title: "Invalid request", message: "Missing required fields: userId, product, or finalPrice" });
        }

        let newOrder = new orderModel(body);
        let data = await newOrder.save();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(400).json({ title: "Cannot add product", message: err.message });
    }
}
