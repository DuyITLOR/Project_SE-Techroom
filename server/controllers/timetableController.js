
import { Lesson } from '../models/lessonModel.js';

// getAllLessonsForWeek retrieves all lessons for the week which the
// user participate in. Apply for teachers/students.
export const getRelatedLessonsForTimetable = async(req, res) => {
	const { userID, weekStartDate } = req.query;
	console.log(`getRelatedLessonsForTimetable called with userid: ${userID}, weekStartDate: ${weekStartDate}`);
	if (!userID || !weekStartDate) {
		return res.status(400).send({
			success: false,
			message: "User ID or week start date cannot be empty!"
		});
	}

	try {
		let listLessons;
		listLessons = await Lesson.getRelatedLessonsForWeek(userID, weekStartDate);
		
		return res.status(200).send({
			success: true,
			message: 'Lessons retrieved successfully',
			listLessons: listLessons,
		});
	} catch (error) {
		console.error(`Error retrieving related lessons for timetable:`, error);
		return res.status(500).send({
			success: false,
			message: "Error retrieving related lessons for week in timetable.",
		});
	}
}
