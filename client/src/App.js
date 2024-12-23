
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home';
import Navbar from './Components/Navbar';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import EmailVerification from './Pages/EmailVerification';
import Aboutus from './Pages/Aboutus';
import ResetPassword from './Pages/ResetPassword';
import UpdatePassword from './Pages/UpdatePassword';
import DashBoard from './Pages/DashBoard';
import Cart from './Components/core/DashBoard/Cart';
import MyProfile from './Components/core/DashBoard/MyProfile';
import InstructorCourse from './Components/core/DashBoard/InstructorCourses/InstructorCourse';
import AddCourse from './Components/core/DashBoard/AddNewCourse/index';
import EnrolledCourse from './Components/core/DashBoard/EnrolledCourses/EnrolledCourse';
import Catalog from './Pages/Catalog';
import { useSelector } from 'react-redux';
import NotFoundPage from './Pages/NotFoundPage';
import CourseDetail from './Pages/CourseDetail';
import CourseVideo from './Components/core/ViewCourse/CourseVideo';
import { ViewCourse } from './Pages/ViewCourse';
import MyCourses from './Components/core/DashBoard/MyCourses';
import EditCourse from './Components/core/DashBoard/EditCourse/EditCourse';
import ContactUs from './Pages/ContactUs';

function App() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  return (
    <div className='w-screen  h-screen bg-richblack-900 font-inter'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/choose-password/:id" element={<UpdatePassword />} />
        <Route path="/dashboard/" element={token ? <DashBoard /> : <NotFoundPage />}>
          {
            user?.accountType === "Student" && (
              <>
                <Route path="/dashboard/my-profile" element={<MyProfile />} />
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourse />} />
                <Route path="/dashboard/cart" element={<Cart />} />

              </>
            )
          }
          {
            user?.accountType === "Instructor" && (
              <>
                <Route path="/dashboard/add-course" element={<AddCourse />} />
                <Route path="/dashboard/edit-course/:courseId" element={<EditCourse />} />
                <Route path="/dashboard/my-profile" element={<MyProfile />} />
                <Route path="/dashboard/my-courses" element={<MyCourses />} />
              </>
            )
          }
        </Route>
        <Route path="/catalog/:courseName" element={token ? <Catalog /> : <Login />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route path="/view-course/:courseId" element={<ViewCourse />} >
          <Route path="/view-course/:courseId/:subSectionId" element={<CourseVideo />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
