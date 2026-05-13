import { lazy } from 'react';
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';

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

const routes: RouteObject[] = [
  {
    path: ROUTES.root,
    element: <Navigate to={ROUTES.dashboard} replace />,
  },
  {
    element: <GuestRoute />,
    errorElement: <RouterErrorBoundary />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: ROUTES.auth.login, element: <LazyPage><LoginPage /></LazyPage> },
          { path: ROUTES.auth.register, element: <LazyPage><RegisterPage /></LazyPage> },
          { path: ROUTES.auth.forgotPassword, element: <LazyPage><ForgotPasswordPage /></LazyPage> },
          { path: ROUTES.auth.otp, element: <LazyPage><OtpPage /></LazyPage> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    errorElement: <RouterErrorBoundary />,
    children: [
      {
        element: <AppShell />,
        children: [
          { path: ROUTES.dashboard, element: <LazyPage><DashboardPage /></LazyPage> },
          { path: ROUTES.students, element: <LazyPage><StudentsPage /></LazyPage> },
          { path: ROUTES.studentDetails(':id'), element: <LazyPage><StudentDetailsPage /></LazyPage> },
          { path: ROUTES.groups, element: <LazyPage><GroupsPage /></LazyPage> },
          { path: ROUTES.groupDetails(':id'), element: <LazyPage><GroupDetailsPage /></LazyPage> },
          { path: ROUTES.teachers, element: <LazyPage><TeachersPage /></LazyPage> },
          { path: ROUTES.payments, element: <LazyPage><PaymentsPage /></LazyPage> },
          { path: ROUTES.leads, element: <LazyPage><LeadsPage /></LazyPage> },
          { path: ROUTES.attendance, element: <LazyPage><AttendancePage /></LazyPage> },
          { path: ROUTES.tasks, element: <LazyPage><TasksPage /></LazyPage> },
          { path: ROUTES.calendar, element: <LazyPage><CalendarPage /></LazyPage> },
          { path: ROUTES.reports, element: <LazyPage><ReportsPage /></LazyPage> },
          { path: ROUTES.notifications, element: <LazyPage><NotificationsPage /></LazyPage> },
          { path: ROUTES.settings, element: <LazyPage><SettingsPage /></LazyPage> },
          { path: ROUTES.activityLog, element: <LazyPage><ActivityLogPage /></LazyPage> },
        ],
      },
    ],
  },
  { path: '*', element: <LazyPage><NotFoundPage /></LazyPage> },
];

export const router = createBrowserRouter(routes);
