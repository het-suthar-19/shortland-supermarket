import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Get all employees
router.get("/", async (req, res) => {
    try {
        const employees = await prisma.employee.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: "Error fetching employees" });
    }
});

// Get single employee
router.get("/:id", async (req, res) => {
    try {
        const employee = await prisma.employee.findUnique({
            where: { id: req.params.id },
            include: { attendance: true },
        });
        if (!employee) return res.status(404).json({ error: "Employee not found" });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: "Error fetching employee" });
    }
});

// Create employee
router.post("/", async (req, res) => {
    try {
        const { name, email, phone, role, hourlyRate, joiningDate, active } = req.body;

        // Basic validation
        if (!name || !email || !hourlyRate) {
            return res.status(400).json({ error: "Name, email and hourly rate are required" });
        }

        const employee = await prisma.employee.create({
            data: {
                name,
                email,
                phone,
                role,
                hourlyRate: parseFloat(hourlyRate),
                joiningDate: joiningDate ? new Date(joiningDate) : undefined,
                active: active !== undefined ? active : true,
            },
        });
        res.status(201).json(employee);
    } catch (error) {
        if (error.code === "P2002") {
            return res.status(400).json({ error: "Email already exists" });
        }
        console.error(error);
        res.status(500).json({ error: "Error creating employee" });
    }
});

// Update employee
router.put("/:id", async (req, res) => {
    try {
        const { name, email, phone, role, hourlyRate, joiningDate, active } = req.body;
        const employee = await prisma.employee.update({
            where: { id: req.params.id },
            data: {
                name,
                email,
                phone,
                role,
                hourlyRate: hourlyRate ? parseFloat(hourlyRate) : undefined,
                joiningDate: joiningDate ? new Date(joiningDate) : undefined,
                active,
            },
        });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: "Error updating employee" });
    }
});

// Delete employee
router.delete("/:id", async (req, res) => {
    try {
        await prisma.employee.delete({
            where: { id: req.params.id },
        });
        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting employee" });
    }
});

export default router;
