import './App.css';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@client/components/pages/Home';
import { ApplicationPage } from '@client/components/pages/Application';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:applicationId" element={<ApplicationPage />} />
    </Routes>
  );
}
