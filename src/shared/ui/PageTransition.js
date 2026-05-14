import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
export function PageTransition({ children }) {
    const { pathname } = useLocation();
    return (_jsx(motion.div, { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.22, ease: 'easeOut' }, children: children }, pathname));
}
