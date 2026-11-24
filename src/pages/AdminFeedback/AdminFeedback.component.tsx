import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Nav } from '../../components/Nav/Nav.component';
import { Tabs } from '../../components/Tabs/Tabs.component';
import { Button } from '../../components/Button/Button.component';
import { selectCurrentUser, selectIsAdmin } from '../../features/authSlice';
import { useGetFeedbackQuery, useMarkFeedbackReadMutation } from '../../features/feedbackApiSlice';
import './AdminFeedback.scss';

type FeedbackItem = {
    _id: string,
    email: string,
    feedback: string,
    dateSubmitted: string,
    status: 'read' | 'unread',
}

const FILTER_OPTIONS = [
    { value: 'unread', tab: 'Unread' },
    { value: 'read', tab: 'Read' },
    { value: 'all', tab: 'All' },
];

const formatDate = (value: string) => new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
});

export const AdminFeedback = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isAdmin = useSelector(selectIsAdmin);
    const hasUser = Object.keys(currentUser || {}).length > 0;
    const [filterByValue, setFilterByValue] = useState('unread');
    const { data, isFetching, isError } = useGetFeedbackQuery(filterByValue, { skip: !isAdmin });
    const [markFeedbackRead, { isLoading: isMarking }] = useMarkFeedbackReadMutation();
    const [markingId, setMarkingId] = useState<string | null>(null);

    if (hasUser && !isAdmin) return <Navigate to="/" replace />;
    // With a saved token, Nav is still logging the user in, so wait for their role.
    if (!hasUser && !localStorage.getItem('accessToken')) return <Navigate to="/auth" replace />;

    const markAsRead = async (id: string) => {
        setMarkingId(id);
        try {
            await markFeedbackRead(id).unwrap();
        } catch {
            toast.error('Could not mark that feedback as read. Please try again.');
        } finally {
            setMarkingId(null);
        }
    }

    const items: FeedbackItem[] = data ?? [];

    const getEmptyMessage = () => {
        if (isError) return "We couldn't load the feedback. Please try again in a moment.";
        if (filterByValue === 'unread') return 'No unread feedback. Nice work.';
        if (filterByValue === 'read') return 'No read feedback yet.';
        return 'No feedback yet.';
    }

    return (
        <>
            <Nav />
            <main className="admin-page">
                {isAdmin ? (
                    <>
                        <span className="eyebrow">Admin</span>
                        <h1 className="admin-title">Feedback</h1>
                        <div className="admin-feedback-bar">
                            <Link to="/admin" className="admin-feedback-back">Back to tools</Link>
                            <Tabs
                                label="Filter by status"
                                tabs={FILTER_OPTIONS.map(({ value, tab }) => ({
                                    title: tab,
                                    value,
                                    active: filterByValue === value,
                                    setTab: () => setFilterByValue(value),
                                }))}
                            />
                        </div>
                        {!isFetching && items.length === 0 && (
                            <div className="collection-empty">{getEmptyMessage()}</div>
                        )}
                        {items.length > 0 && (
                            <ul className="feedback-list">
                                {items.map((item) => (
                                    <li className="feedback-row" key={item._id}>
                                        <div className="feedback-row-meta">
                                            <span className={`feedback-status feedback-status-${item.status}`}>
                                                {item.status}
                                            </span>
                                            <span className="feedback-date">{formatDate(item.dateSubmitted)}</span>
                                            <span className="feedback-email">{item.email || 'No email given'}</span>
                                        </div>
                                        <p className="feedback-text">{item.feedback}</p>
                                        {item.status === 'unread' && (
                                            <div className="feedback-row-actions">
                                                <Button
                                                    text={markingId === item._id ? 'Saving...' : 'Mark as read'}
                                                    secondary={true}
                                                    buttonType="button"
                                                    disabled={isMarking}
                                                    callback={() => markAsRead(item._id)}
                                                />
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                ) : (
                    <p role="status">Checking access...</p>
                )}
            </main>
        </>
    )
}
