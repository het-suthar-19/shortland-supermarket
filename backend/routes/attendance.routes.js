import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Get all attendance records (can filter by dateRange or employeeId via query params)
router.get("/", async (req, res) => {
    try {
        const { employeeId, startDate, endDate } = req.query;

        const where = {};
        if (employeeId) where.employeeId = employeeId;
        if (startDate && endDate) {
            where.date = {
                gte: new Date(startDate),
                lte: new Date(endDate),
            };
        }

        const attendance = await prisma.attendance.findMany({
            where,
            include: { employee: true },
            orderBy: { date: "desc" },
        });
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: "Error fetching attendance records" });
    }
});

// Log attendance
router.post("/", async (req, res) => {
    try {
        const { employeeId, date, hoursWorked, status } = req.body;

        if (!employeeId || !date || hoursWorked === undefined) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const attendance = await prisma.attendance.create({
            data: {
                employeeId,
                date: new Date(date),
                hoursWorked: parseFloat(hoursWorked),
                status: status || "present",
            },
        });
        res.status(201).json(attendance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error logging attendance" });
    }
});

// Update attendance record
router.put("/:id", async (req, res) => {
    try {
        const { hoursWorked, status, date } = req.body;
        const attendance = await prisma.attendance.update({
            where: { id: req.params.id },
            data: {
                hoursWorked: hoursWorked ? parseFloat(hoursWorked) : undefined,
                status,
                date: date ? new Date(date) : undefined
            },
        });
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: "Error updating attendance" });
    }
});

// Delete attendance record
router.delete("/:id", async (req, res) => {
    try {
        await prisma.attendance.delete({
            where: { id: req.params.id },
        });
        res.json({ message: "Attendance record deleted" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting attendance" });
    }
});

export default router;
