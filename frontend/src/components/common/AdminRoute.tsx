import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminRoute = () => {
    const auth = useContext(AuthContext);

    if (!auth || !auth.token) {
        return <Navigate to="/login" />;
    }

    return auth.role === 'admin' ? <Outlet /> : <Navigate to="/login" />;
}

export default AdminRoute;

