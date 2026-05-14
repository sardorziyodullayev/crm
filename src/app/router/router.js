import { jsx as _jsx } from "react/jsx-runtime";
import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '@widgets/AppShell';
import { AuthLayout } from '@widgets/AuthLayout';
import { ProtectedRoute } from '@features/auth/ui/ProtectedRoute';
import { GuestRoute } from '@features/auth/ui/GuestRoute';
import { LazyPage } from '@shared/ui/LazyPage';
import { RouterErrorBoundary } from '@shared/ui/RouterErrorBoundary';
import { ROUTES } from './routes';
const DashboardPage = lazy(() => import('@pages/dashboard'));
const StudentsPage = lazy(() => import('@pages/students'));
const StudentDetailsPage = lazy(() => import('@pages/students/details'));
const GroupsPage = lazy(() => import('@pages/groups'));
const GroupDetailsPage = lazy(() => import('@pages/groups/details'));
const TeachersPage = lazy(() => import('@pages/teachers'));
const PaymentsPage = lazy(() => import('@pages/payments'));
const LeadsPage = lazy(() => import('@pages/leads'));
const AttendancePage = lazy(() => import('@pages/attendance'));
const TasksPage = lazy(() => import('@pages/tasks'));
const CalendarPage = lazy(() => import('@pages/calendar'));
const ReportsPage = lazy(() => import('@pages/reports'));
const NotificationsPage = lazy(() => import('@pages/notifications'));
const SettingsPage = lazy(() => import('@pages/settings'));
const ActivityLogPage = lazy(() => import('@pages/activity-log'));
const LoginPage = lazy(() => import('@pages/auth/login'));
const RegisterPage = lazy(() => import('@pages/auth/register'));
const ForgotPasswordPage = lazy(() => import('@pages/auth/forgot-password'));
const OtpPage = lazy(() => import('@pages/auth/otp'));
const NotFoundPage = lazy(() => import('@pages/not-found'));
const routes = [
    {
        path: ROUTES.root,
        element: _jsx(Navigate, { to: ROUTES.dashboard, replace: true }),
    },
    {
        element: _jsx(GuestRoute, {}),
        errorElement: _jsx(RouterErrorBoundary, {}),
        children: [
            {
                element: _jsx(AuthLayout, {}),
                children: [
                    { path: ROUTES.auth.login, element: _jsx(LazyPage, { children: _jsx(LoginPage, {}) }) },
                    { path: ROUTES.auth.register, element: _jsx(LazyPage, { children: _jsx(RegisterPage, {}) }) },
                    { path: ROUTES.auth.forgotPassword, element: _jsx(LazyPage, { children: _jsx(ForgotPasswordPage, {}) }) },
                    { path: ROUTES.auth.otp, element: _jsx(LazyPage, { children: _jsx(OtpPage, {}) }) },
                ],
            },
        ],
    },
    {
        element: _jsx(ProtectedRoute, {}),
        errorElement: _jsx(RouterErrorBoundary, {}),
        children: [
            {
                element: _jsx(AppShell, {}),
                children: [
                    { path: ROUTES.dashboard, element: _jsx(LazyPage, { children: _jsx(DashboardPage, {}) }) },
                    { path: ROUTES.students, element: _jsx(LazyPage, { children: _jsx(StudentsPage, {}) }) },
                    { path: ROUTES.studentDetails(':id'), element: _jsx(LazyPage, { children: _jsx(StudentDetailsPage, {}) }) },
                    { path: ROUTES.groups, element: _jsx(LazyPage, { children: _jsx(GroupsPage, {}) }) },
                    { path: ROUTES.groupDetails(':id'), element: _jsx(LazyPage, { children: _jsx(GroupDetailsPage, {}) }) },
                    { path: ROUTES.teachers, element: _jsx(LazyPage, { children: _jsx(TeachersPage, {}) }) },
                    { path: ROUTES.payments, element: _jsx(LazyPage, { children: _jsx(PaymentsPage, {}) }) },
                    { path: ROUTES.leads, element: _jsx(LazyPage, { children: _jsx(LeadsPage, {}) }) },
                    { path: ROUTES.attendance, element: _jsx(LazyPage, { children: _jsx(AttendancePage, {}) }) },
                    { path: ROUTES.tasks, element: _jsx(LazyPage, { children: _jsx(TasksPage, {}) }) },
                    { path: ROUTES.calendar, element: _jsx(LazyPage, { children: _jsx(CalendarPage, {}) }) },
                    { path: ROUTES.reports, element: _jsx(LazyPage, { children: _jsx(ReportsPage, {}) }) },
                    { path: ROUTES.notifications, element: _jsx(LazyPage, { children: _jsx(NotificationsPage, {}) }) },
                    { path: ROUTES.settings, element: _jsx(LazyPage, { children: _jsx(SettingsPage, {}) }) },
                    { path: ROUTES.activityLog, element: _jsx(LazyPage, { children: _jsx(ActivityLogPage, {}) }) },
                ],
            },
        ],
    },
    { path: '*', element: _jsx(LazyPage, { children: _jsx(NotFoundPage, {}) }) },
];
export const router = createBrowserRouter(routes);
