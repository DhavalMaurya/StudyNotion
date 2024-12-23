import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../../service/operations/profile";
import convertSecondsToDuration from "../../../../utils/secToDuration";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { IoAdd } from "react-icons/io5";
import Button from "../../Home/button";

const EnrolledCourse = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
    } catch (error) {
      setError("Unable to fetch enrolled courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  const getTimeDuration = (course) => {
    const totalSeconds = course.courseContent?.reduce((acc, content) => {
      return (
        acc +
        (content.subSections?.reduce((subAcc, sub) => {
          return subAcc + parseInt(sub.timeDuration || 0);
        }, 0) || 0)
      );
    }, 0);

    return convertSecondsToDuration(totalSeconds);
  };

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="text-white bg-richblack-900 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">My Courses</h1>
        <Link to="/">
          <Button active={true}>
            <div className="flex gap-2 items-center">
              <span>Get More Courses</span>
              <IoAdd className="text-xl" />
            </div>
          </Button>
        </Link>
      </div>

      <Table className="w-full rounded-lg border border-richblack-800 bg-richblack-800">
        <Thead>
          <Tr className="border-b border-richblack-700 bg-richblack-900">
            <Th className="py-4 px-4 text-left">COURSES</Th>
            <Th className="py-4 px-8 text-center">DURATION</Th>
          </Tr>
        </Thead>

        <Tbody>
          {enrolledCourses.map((course) => (
            <Tr key={course._id} className="border-b border-richblack-700">
              <Td className="py-6 px-4">
                <div className="flex items-start gap-4">
                  <img
                    src={course.thumbnail}
                    alt="Course Thumbnail"
                    className="h-[170px] w-[250px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col gap-1">
                    <h2 className="font-bold text-lg">{course.name}</h2>
                    <p className="text-sm text-gray-400">
                      {course.description.split(" ").slice(0, 30).join(" ")}...
                    </p>
                    <Link
                      to={`/view-course/${course._id}`}
                      className="bg-yellow-300 text-black font-bold py-1 px-3 mt-4 rounded-lg self-start"
                    >
                      Watch Course
                    </Link>
                  </div>
                </div>
              </Td>

              <Td className="text-center text-sm px-8">
                {getTimeDuration(course)}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default EnrolledCourse;
