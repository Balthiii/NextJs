import { NextApiRequest, NextApiResponse } from "next";
import { fetchCourses, deleteCourse } from "@/app/lib/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const courses = await fetchCourses();
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    try {
      await deleteCourse(id as string);
      res.status(200).json({ message: "Course deleted" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete course" });
    }
  } else {
    res.setHeader("Allow", ["GET", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
