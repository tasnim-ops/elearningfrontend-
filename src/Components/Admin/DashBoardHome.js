import React, { useEffect,useState }  from 'react'
import './DashBoard.css';
import {BsListCheck, BsFillArchiveFill, BsFillGrid3X3GapFill,BsFillGearFill, BsPeopleFill} from 'react-icons/bs'
import { IoMdTrash } from "react-icons/io";
import Avatar from '@mui/material/Avatar';
import {Modal,Alert, Button} from 'react-bootstrap';
import {getStudents,deleteStudent, findStudentByID} from '../../features/studentSlice';
import { getTeachers,deleteTeacher, findTeacherByID } from '../../features/teacherSlice';
import { HiPencilSquare } from "react-icons/hi2";
import { useSelector, useDispatch } from 'react-redux';
import { deleteCategory, getCategories } from '../../features/categorySlice';
import { deleteCourse, getCourses } from '../../features/courseSlice';
import { BsSearch} from 'react-icons/bs';
import SearchResults from './SearchResults';
import SearchBar from './SearchBar';
const DashBoardHome = () => {
  const {teachers}=useSelector((state)=>state.teacher);
  const {students}=useSelector((state)=>state.student);
  const {categories}=useSelector((state)=>state.category);
  const {courses}=useSelector((state)=>state.course);
  const dispatch=useDispatch();

  //couse's documents modal
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCourseClick = (course) => {
    console.log("Selected Course:", course);
    setSelectedCourse(course);
    handleOpenModal();
  };
  

  const handleOpenModal = () => {
    console.log("Selected Course:", selectedCourse);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  useEffect(() => {
    dispatch(getTeachers());
    dispatch(getCourses());
    dispatch(getCategories());
    dispatch(getStudents());
  }, [dispatch]);
  
  

    const handleDeleteStudent = (id) =>{
      if(window.confirm("Your are going to delete a student  O/N")) {
        dispatch(deleteTeacher(id));
        }
    }
                      /************************Deletion*******************************/
                      const [confDeletion, setConfDeletion] = useState(false);
                      const [showDeleteModal, setShowDeleteModal] = useState(false,'');
                      const [selectedId, setSelectedId] = useState(null);
                      const [showDeleteSuccessAlert, setShowDeleteSuccessAlert] = useState(false);
                      const [attribute, setAttribute]=useState('')
                      const çhandleShowDeleteModal = (id) => {
                        setSelectedId(id);
                        setShowDeleteModal(true);
                      };
            
                      const handleCloseDeleteModal = () => setShowDeleteModal(false);
            
                      const handleDelete = (id,atrributetype) => {
                        setConfDeletion(false);
                        setSelectedId(id);
                        setShowDeleteModal(true);
                        setAttribute(atrributetype);
                      };
            
                      
                      const handleDeleteConfirmed = () => {
                        let deleteAction;

                        switch (attribute) {
                          case "teacher":
                            deleteAction = deleteTeacher(selectedId);
                            break;
                          case "student":
                            deleteAction = deleteStudent(selectedId);
                            break;
                          case "category":
                            deleteAction = deleteCategory(selectedId);
                            break;
                          default:
                            deleteAction = deleteCourse(selectedId);
                        }

                        dispatch(deleteAction);
                        setShowDeleteSuccessAlert(true);

                        setTimeout(() => {
                          setShowDeleteSuccessAlert(false);
                          handleCloseDeleteModal();
                          //dispatch(deleteCategorySuccess());
                          dispatch(getTeachers()); // Rafraîchir la liste après la suppression
                        }, 2000);
                      };

                      const [showDeleteErrorAlert, setShowDeleteErrorAlert] = useState(false);



                      //Search Process
                      const searchFields = [
                        { class: 'teacher' },
                        { class: 'student' },
                        { class: 'category' },
                        { class: 'course' },
                      ];
                      const [searchTerm, setSearchTerm] = useState('');
                      const [searchResults, setSearchResults] = useState([]);
                      const [currentSearchTerm, setCurrentSearchTerm] = useState('');
                      const handleSearchChange = (entityClass, newSearchTerm) => {
                        // Pas besoin de vérifier searchTerm ici, car vous souhaitez effectuer la recherche à chaque modification de la saisie
                        setCurrentSearchTerm(newSearchTerm);
                      
                        // initialize an empty array
                        let filteredEntities = [];
                      
                        switch (entityClass) {
                          case 'teacher':
                            filteredEntities = teachers.filter((teacher) => {
                              const fullName = `${teacher.firstname} ${teacher.lastname}`;
                              return fullName.toLowerCase().includes(newSearchTerm.toLowerCase());
                            });
                            break;
                          case 'student':
                            filteredEntities = students.filter((student) => {
                              const fullName = `${student.firstname} ${student.lastname}`;
                              return fullName.toLowerCase().includes(newSearchTerm.toLowerCase());
                            });
                            break;
                          case 'category':
                            filteredEntities = categories.filter((category) =>
                              category.name_categ && category.name_categ.toLowerCase().includes(newSearchTerm.toLowerCase())
                            );
                            break;
                          case 'course':
                            filteredEntities = courses.filter((course) =>
                              course.title && course.title.toLowerCase().includes(newSearchTerm.toLowerCase())
                            );
                            break;
                          default:
                            console.error(`Unsupported entity class: ${entityClass}`);
                        }
                      
                        console.log(`Search results for ${entityClass}:`, filteredEntities);
                        setSearchResults(filteredEntities);
                      }
                      
                      

  return (
    <>
    <main className='main-container'>
        <div className='main-title'>
        </div>
        <div className='main-cards'>
            <div className='card' >
                <div className='card-inner'>
                    <p>CATEGORIES</p>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h3>{categories.length}</h3>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <p>COURSES</p>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h3>{courses.length}</h3>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <p>TEACHERS</p>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h3>{teachers.length}</h3>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <p>STUDENTS</p>
                    <student className='card_icon'/>
                </div>
                <h3>{students.length}</h3>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <p>CONFERENCES</p>
                    <BsListCheck className='card_icon'/>
                </div>
                <h3>150</h3>
            </div>
        </div>
        <div>

        </div>
        {/* teacher table  */}
        <div id="course">
          <div className="row mt-2">
          <div className="col-sm-4 mb-2">
            <h2>Teacher</h2>
          </div>
          <div className="col-sm-4 mb-2">
          <SearchBar
  entityClass="teacher" // Remplacez par la classe d'entité actuelle
  onSearchChange={(newSearchTerm) => handleSearchChange("teacher", newSearchTerm)}
/>
          </div>
        </div>
        {/* SearchResults pour les enseignants */}
        <SearchResults results={searchResults} />
  {teachers.length > 0 && (
    <table className='table'>
      <thead>
        <tr>
          <th>Photo</th>
          <th>Name</th>
          <th>Description</th>
          <th>Phone</th>
          <th>Mail</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {teachers.map((teacher) => (
          <tr key={teacher.id}>
            <td>
              <Avatar src={teacher.photo} sx={{ width: 56, height: 56 }}/>
            </td>
            <td>
              {teacher.firstname} {teacher.lastname}
            </td>
            <td>{teacher.desc}</td>
            <td>{teacher.phone}</td>
            <td>{teacher.email}</td>
            <td>
              <IoMdTrash type='button' onClick={() => handleDelete(teacher.id, "teacher")} /> <HiPencilSquare />
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

        {/* student table  */}
        <div id="student">
  <div className="row mt-2">
    <div className="col-sm-4 mb-2">
      <h2>Students</h2>
    </div>
    <div className="col-sm-4 mb-2">
      <SearchBar
        entityClass="student"
        entities={students}
        onSearchChange={handleSearchChange}
      />
    </div>
  </div>
  {students.length > 0 && (
    <table className='table'>
      <thead>
        <tr>
          <th>Photo</th>
          <th>Name</th>
          <th>Description</th>
          <th>Phone</th>
          <th>Mail</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>
              <Avatar src={student.photo} sx={{ width: 56, height: 56 }} />
            </td>
            <td>
              {student.firstname} {student.lastname}
            </td>
            <td>{student.desc}</td>
            <td>{student.phone}</td>
            <td>{student.email}</td>
            <td>
              <IoMdTrash type='button' onClick={() => handleDelete(student.id, "student")} /> <HiPencilSquare />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
        </div>

        {/* Ctegories table  */}
        <div id="categories">
          <div className="row mt-2">
            <div className="col-sm-4 mb-2">
              <h2>Categories</h2>
            </div>
            <div className="col-sm-4 mb-2">
              <SearchBar
                entityClass="category"
                entities={categories}
                onSearchChange={handleSearchChange}
              />
            </div>
          </div>
          {categories.length > 0 && (
            <table className='table'>
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Category name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((categ) => (
                  <tr key={categ.id}>
                    <td>
                      <Avatar src={categ.photo} sx={{ width: 56, height: 56 }} />
                    </td>
                    <td>
                      {categ.name_categ}
                    </td>
                    <td>
                      <IoMdTrash type='button' onClick={() => handleDelete(categ.id, "category")} /> <HiPencilSquare />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* Courses table  */}
        <div id="course">
  <div className="row mt-2">
    <div className="col-sm-4 mb-2">
      <h2>Courses</h2>
    </div>
    <div className="col-sm-4 mb-2">
      <SearchBar
        entityClass="course"
        entities={courses}
        onSearchChange={handleSearchChange}
      />
    </div>
  </div>
  {courses.length > 0 && (
    <table className='table'>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Category</th>
          <th>Teacher</th>
          <th>Documents</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => (
          <tr key={course.id}>
            <td>
              {course.title}
            </td>
            <td>
              {course.course_description}
            </td>
            <td>{course.price}</td>
            <td>{course.category.name_categ}</td>
            <td>{course.teacher.firstname}  {course.teacher.lastname}</td>
            <td>
              <button className='btn' type='button' onClick={() => handleCourseClick(course)}>Show</button>
            </td>
            <td>
              <IoMdTrash type='button' onClick={() => handleDelete(course.id, "course")} /> <HiPencilSquare />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

    </main>
   {/* Deletion Modal  */}
   <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} backdrop='static' centered keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title> Warning !!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Are you sure you want to delete this {attribute} ? Doing so will result in the deletion of all corresponding activities
            {showDeleteSuccessAlert && (
          <Alert variant="success" className="mt-3">
            Deleted successfully
          </Alert>
        )}
        {showDeleteErrorAlert && (
          <Alert variant="danger" className="mt-3">
            Error! Cann not delete
          </Alert>
        )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={handleDeleteConfirmed}>Delete</Button>
          <Button variant='secondary' onClick={handleCloseDeleteModal}>Cancel</Button>
        </Modal.Footer> 

      </Modal>
   {/* Documents list Modal  */}
   <Modal show={isModalOpen} onHide={handleCloseModal}>
    <Modal.Header closeButton>
      <Modal.Title>
        {selectedCourse && selectedCourse.title ? selectedCourse.title : 'Title not available'}
      </Modal.Title>
    </Modal.Header>

  <Modal.Body dialogClassName="custom-modal">
    <h3>Documents:</h3>
    <ul>
      {selectedCourse ? (
        selectedCourse.documents.map((document,index) => (
          <li key={index}>
          {document.type === 'mp4' ? (
            <video controls className="video-player">
              <source src={document.path} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <a href={document.path} target="_blank" rel="noopener noreferrer">
              View Document
            </a>
          )}
          </li>
        ))
      ) : (
        <li>No documents available</li>
      )}
    </ul>
  </Modal.Body>
  <Modal.Footer>
    <Button variant='secondary' onClick={handleCloseModal}>
      Fermer
    </Button>
  </Modal.Footer>
</Modal>


    </>
  )
}

export default DashBoardHome