import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from '@/pages/Home'
import { LibraryPage } from '@/pages/Library'
import { ResourceDetailPage } from '@/pages/ResourceDetail'
import { PublishPage } from '@/pages/Publish'
import { ProfilePage } from '@/pages/Profile'
import { LoginPage } from '@/pages/Login'
import { RegisterPage } from '@/pages/Register'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/library/:id" element={<ResourceDetailPage />} />
        <Route path="/publish" element={<PublishPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  )
}
