import {
  Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider
} from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import AddJobPage from './pages/AddJobPage';
import JobPage, {jobLoader} from './pages/JobPage';
import EditJobPage from './pages/EditJobPage';



const App = () => {

  //ADD NEW JOB FUNCTION

  const addJob = async (newJob) => {
  const response = await fetch('/api/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newJob)
  });
  return;
  
};

//DELETE JOB FUNCTION

const deleteJob = async (id) => {
  const response = await fetch(`/api/jobs/${id}`, {
    method: 'DELETE',
  });
  return;
  
}

//UPDATE JOB FUNCTION

const updateJob = async (job) => {
  const response = await fetch(`/api/jobs/${job.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(job)
  });
  return;
  
}


const router= createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<MainLayout />}>
  <Route index element={<HomePage />} />
  <Route path='/jobs' element={<JobsPage />}  />
  <Route path='/add-job' element={<AddJobPage AddJobSubmit={addJob} />}  />
  <Route path='/edit-job/:id' element={<EditJobPage updateJobSubmit={updateJob} />} loader={jobLoader}/>
  <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob} />} loader={jobLoader}/>
  <Route path='*' element={<NotFoundPage />} />
  
  </Route>
)
);
  return <RouterProvider router={router} />
};

export default App