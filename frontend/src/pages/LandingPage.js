import {Link, useNavigate} from "react-router-dom";
import Button from "../components/common/Button";
import {motion} from "framer-motion";
import {useMyContext} from "../store/AppContext";

const fadeInFromTop = {
    hidden: {opacity: 0, y: -50},
    visible: {opacity: 1, y: 0, transition: {duration: 0.8}},
};

const fadeInFromBottom = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0, transition: {duration: 0.5}},
};

const LandingPage = () => {
    const navigate = useNavigate();
    const {token} = useMyContext();
    if (token) {
        navigate('/notes');
    }
    return (
        <div className="min-h-[calc(100vh-74px)] flex justify-center">
            <div className="lg:w-[80%] w-full py-16 space-y-4 ">
                <motion.h1
                    className="font-montserrat uppercase text-headerColor xl:text-headerText md:text-4xl text-2xl mx-auto text-center font-bold sm:w-[95%] w-full"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInFromTop}
                >
                    Notes app
                </motion.h1>
                <h3 className="text-logoText md:text-2xl text-xl font-semibold text-slate-800 text-center">
                    This is just to learn spring security
                </h3>
                <p className="text-slate-700 text-center sm:w-[80%] w-[90%] mx-auto">
                    Manage your notes effortlessly and securely. Just type, save, and
                    access them from anywhere with robust encryption.
                </p>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInFromBottom}
                    className="flex items-center justify-center gap-3 py-10 "
                >
                    <Link to="/login">
                        <Button
                            id='sign-in'
                            className="sm:w-52 w-44 bg-customRed font-semibold hover:scale-105 transition-all duration-200 cursor-pointer text-white px-10 py-3 rounded-sm"
                        >
                            SignIn
                        </Button>
                    </Link>
                    <Link to="/signup">
                        <Button
                            id='sign-up'
                            className="sm:w-52 w-44 bg-btnColor font-semibold hover:scale-105 transition-all duration-200 cursor-pointer text-white px-10 py-3 rounded-sm"
                        >
                            SignUp
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default LandingPage;
