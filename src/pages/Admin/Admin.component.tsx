import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Nav } from '../../components/Nav/Nav.component';
import { FetchMedia } from '../../components/FetchMedia/FetchMedia.component';
import { selectCurrentUser, selectIsAdmin } from '../../features/authSlice';
import './Admin.scss';

export const Admin = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isAdmin = useSelector(selectIsAdmin);
    const hasUser = Object.keys(currentUser || {}).length > 0;

    if (hasUser && !isAdmin) return <Navigate to="/" replace />;
    // With a saved token, Nav is still logging the user in, so wait for their role.
    if (!hasUser && !localStorage.getItem('accessToken')) return <Navigate to="/auth" replace />;

    return (
        <>
            <Nav />
            <main className="admin-page">
                {isAdmin ? (
                    <>
                        <span className="eyebrow">Admin</span>
                        <h1 className="admin-title">Tools</h1>
                        <FetchMedia />
                    </>
                ) : (
                    <p role="status">Checking access...</p>
                )}
            </main>
        </>
    )
}
