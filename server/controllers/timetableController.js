import { Lesson } from '../models/lessonModel.js';

export const getRelatedLessonsForWeek = async(res, req) => {
	const { userid, role, weekStartDate } = req.query;
	if (!userid || !role || !weekStartDate) {
		return res.status(400).send({
			success: false,
			message: "User ID, role, or week start date cannot be empty!"
		});
	}

	let listLessons;
	if (role === "admin" || role === "superadmin") {
		listLessons = await Lesson.getRelatedLessonsForWeek(weekStartDate);
		return res.status(200).send({
			success: true,
			listLessons: listLessons
		});
	}
}

