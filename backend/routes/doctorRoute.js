import express from "express";
import { loginCounsellor, registerCounsellor } from "../controller/doctorController.js";
const router = express.Router();

router.post("/login", loginCounsellor);
router.post("/register", registerCounsellor); // optional if self signup is allowed

export default router;
