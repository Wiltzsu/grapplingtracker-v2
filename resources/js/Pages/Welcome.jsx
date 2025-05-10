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

    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-white flex flex-col">
                <GuestHeader auth={auth} showExtraNav={true} />

                {/* Hero Section */}
                <div className="relative px-6 pt-28 lg:px-8 bg-gradient-to-b from-indigo-50 to-white overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0"
                    >
                        <div className="absolute inset-0 bg-[linear-gradient(30deg,#f0f7ff_0%,#ffffff_100%)] opacity-50" />
                        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,transparent)] dark:bg-grid-slate-700/25" />
                    </motion.div>
                    <div className="mx-auto max-w-3xl py-16 sm:py-20 lg:py-24 relative">
                        <motion.div
                            className="text-center"
                            initial="initial"
                            animate="animate"
                            variants={staggerChildren}
                        >
                            <motion.h1
                                variants={fadeIn}
                                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl sm:leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500"
                            >
                                Track your Grappling Journey
                            </motion.h1>
                            <motion.p
                                variants={fadeIn}
                                className="mt-6 text-lg leading-8 text-gray-600"
                            >
                                Record techniques, track progress, and analyze your training. The ultimate companion for Brazilian Jiu-Jitsu and grappling practitioners.
                            </motion.p>
                            {!auth.user && (
                                <motion.div
                                    variants={fadeIn}
                                    className="mt-10 flex items-center justify-center gap-x-6"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link
                                            href={route('register')}
                                            className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:bg-indigo-500 transition-all duration-300 relative overflow-hidden group"
                                        >
                                            <span className="relative z-10">Get Started</span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Features Section */}
                <motion.div
                    className="pt-12 pb-24 sm:pt-16 sm:pb-32 bg-white relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="mx-auto max-w-7xl p lg:px-8">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:gap-y-12 lg:grid-cols-3">
                            {[
                                {
                                    title: "Track Techniques",
                                    description: "Record and organize your techniques by position and category.",
                                    icon: "🥋"
                                },
                                {
                                    title: "Log Classes",
                                    description: "Keep a detailed log of your training sessions and progress.",
                                    icon: "📝"
                                },
                                {
                                    title: "Analyze Progress",
                                    description: "Visualize your development and identify areas for improvement.",
                                    icon: "📈"
                                }
                            ].map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    className="px-6 lg:px-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                                    >
                                        <span className="text-4xl mb-4 block">{feature.icon}</span>
                                        <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                                        <p className="mt-4 text-gray-600">{feature.description}</p>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <Footer />
            </div>
        </>
    );
}
