import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '@client/components/pages/Home';
import { ApplicationPage } from '@client/components/pages/Application';

export default function App() {
  return (
    <Router>
      <div className="container mx-auto py-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:applicationId" element={<ApplicationPage />} />
        </Routes>
      </div>
    </Router>
  );
}
