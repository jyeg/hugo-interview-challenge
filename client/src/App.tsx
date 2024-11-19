import './App.css';
import { Routes, Route } from 'react-router-dom';
import { CreateApp } from '@client/components/pages/CreateApp';
import { ExistingApp } from '@client/components/pages/ExistingApp';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateApp />} />
      <Route path="/:applicationId" element={<ExistingApp />} />
    </Routes>
  );
}
