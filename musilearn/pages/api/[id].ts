import { NextApiRequest, NextApiResponse } from "next";
import { fetchCourseById, updateCourse } from "@/app/lib/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const course = await fetchCourseById(id as string);
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch course" });
    }
  } else if (req.method === "PUT") {
    try {
      const updatedCourse = await updateCourse(id as string, req.body);
      res.status(200).json(updatedCourse);
    } catch (error) {
      res.status(500).json({ error: "Failed to update course" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
