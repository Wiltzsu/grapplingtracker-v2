import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import GuestHeader from '@/Components/GuestHeader';
import { motion, useReducedMotion } from 'framer-motion';

export default function Welcome({ auth, canLogin, canRegister }) {
    const prefersReducedMotion = useReducedMotion();

    // If user prefers reduced motion or is on mobile, disable animations
    const shouldAnimate = !prefersReducedMotion;

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    const staggerChildren = {
        animate: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const floatingAnimation = {
        animate: {
            y: [-10, 10, -10],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
                <GuestHeader auth={auth} showExtraNav={true} />

                {/* Hero Section */}
                <div className="relative px-6 pt-28 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl"
                            animate={shouldAnimate ? floatingAnimation.animate : {}}
                        />
                        <motion.div
                            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
                            animate={shouldAnimate ? {
                                ...floatingAnimation.animate,
                                transition: { ...floatingAnimation.animate.transition, delay: 2 }
                            } : {}}
                        />
                    </div>

                    {/* Background Image with better overlay */}
                    <img
                        src="/images/grapplingtracker-hero.jpg"
                        alt="Grappling"
                        className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-30 pointer-events-none z-0"
                    />

                    {/* Enhanced Overlays */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 z-10"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-indigo-50/80 dark:from-gray-900/80 dark:via-gray-800/60 dark:to-gray-900/80" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
                    </motion.div>

                    {/* Content */}
                    <div className="mx-auto max-w-4xl py-20 sm:py-24 lg:py-32 relative z-20">
                        <motion.div
                            className="text-center"
                            initial="initial"
                            animate="animate"
                            variants={staggerChildren}
                        >
                            {/* Badge */}
                            <motion.div
                                variants={fadeIn}
                                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 mb-8"
                            >
                                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse"></span>
                                New: Enhanced Analytics Dashboard
                            </motion.div>

                            <motion.h1
                                variants={fadeIn}
                                className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl lg:text-8xl sm:leading-tight"
                            >
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 dark:from-indigo-400 dark:via-purple-400 dark:to-blue-400">
                                    Track your
                                </span>
                                <br />
                                <span className="text-gray-900 dark:text-white">
                                    Grappling Journey
                                </span>
                            </motion.h1>

                            <motion.p
                                variants={fadeIn}
                                className="mt-8 text-xl leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                            >
                                Record techniques, track progress, and analyze your training with powerful insights.
                                The ultimate companion for Brazilian Jiu-Jitsu and grappling practitioners.
                            </motion.p>

                            {!auth.user && (
                                <motion.div
                                    variants={fadeIn}
                                    className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {/* <Link
                                            href={route('register')}
                                            className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                                        >
                                            <span className="relative z-10 flex items-center">
                                                Get Started Free
                                                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </Link> */}
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link
                                            href={route('login')}
                                            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                                        >
                                            Sign In
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            )}

                            {/* Feature Highlights */}
                            <motion.div
                                variants={fadeIn}
                                className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
                            >
                                {[
                                    { icon: "🚀", label: "Easy Setup" },
                                    { icon: "📱", label: "Mobile Friendly" },
                                    { icon: "🔒", label: "Secure & Private" }
                                ].map((feature, index) => (
                                    <div key={feature.label} className="text-center">
                                        <div className="text-3xl mb-2">{feature.icon}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">{feature.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Enhanced Features Section */}
                <motion.div
                    className="py-24 sm:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        {/* Section Header */}
                        <div className="text-center mb-20">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl"
                            >
                                Everything you need to
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"> improve your game</span>
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                            >
                                Powerful tools designed specifically for grappling practitioners to track, analyze, and improve their skills.
                            </motion.p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-3">
                            {[
                                {
                                    title: "Track Techniques",
                                    description: "Record and organize your techniques by position and category with detailed notes and video links.",
                                    icon: "🥋",
                                    features: ["Position-based organization", "Video attachments", "Progress tracking"]
                                },
                                {
                                    title: "Log Classes",
                                    description: "Keep a detailed log of your training sessions, partners, and key learnings from each class.",
                                    icon: "📝",
                                    features: ["Session notes", "Partner tracking", "Class history"]
                                },
                                {
                                    title: "Analyze Progress",
                                    description: "Visualize your development with comprehensive analytics and identify areas for improvement.",
                                    icon: "📈",
                                    features: ["Progress charts", "Skill analysis", "Goal tracking"]
                                }
                            ].map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    className="group"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                >
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="relative">
                                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                                {feature.icon}
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                                            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{feature.description}</p>
                                            <ul className="space-y-2">
                                                {feature.features.map((item, idx) => (
                                                    <li key={idx} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                        <svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* CTA Section */}
                {!auth.user && (
                    <motion.div
                        className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600 relative overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute inset-0" style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                            }} />
                        </div>
                        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center relative">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl font-bold text-white sm:text-5xl"
                            >
                                Ready to elevate your grappling game?
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="mt-6 text-xl text-indigo-100 max-w-2xl mx-auto"
                            >
                                Be part of a growing community of dedicated grapplers who are serious about improvement.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="mt-10"
                            >
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center px-8 py-4 text-lg font-semibold text-indigo-600 bg-white rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300"
                                >
                                    Start Your Journey Today
                                    <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                <Footer />
            </div>
        </>
    );
}
