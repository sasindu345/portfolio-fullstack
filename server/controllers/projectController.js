import Project from "../models/User.js";

export const list = async (_, res) => res.json(await Project.find().sort({ createdAt: -1 }));
export const create = async (req, res) => {
    const doc = await Project.create(req.body);
    res.status(201).json(doc);
};
export const getOne = async (req, res) => {
    const doc = await Project.findById(req.params.id);
    return doc ? res.json(doc) : res.status(404).json({ message: "Not found" });
};
export const update = async (req, res) => {
    const doc = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    return doc ? res.json(doc) : res.status(404).json({ message: "Not found" });
};
export const remove = async (req, res) => {
    const doc = await Project.findByIdAndDelete(req.params.id);
    return doc ? res.json({ message: "Deleted" }) : res.status(404).json({ message: "Not found" });
};