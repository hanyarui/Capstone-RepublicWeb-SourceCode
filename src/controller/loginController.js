import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    res.status(400).json({
      success: false,
      error: "Username atau password salah",
    });
    return;
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    res.status(400).json({
      success: false,
      error: "Username atau password salah",
    });
    return;
  }

  res.status(200).json({
    success: true,
  });
}
