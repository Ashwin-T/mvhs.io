import React, { useState, useEffect } from "react";
import AppRoutes from "./pages/Routes";
import { motion } from "framer-motion/dist/framer-motion";
import {app} from './tools/Firebase'
const App = () => {
   
    const [allow, setAllow] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("showReloadIcon") === "true") {
            setAllow(true);
        } else {
            const timeout = setTimeout(() => {
                setAllow(true);
                localStorage.setItem("showReloadIcon", "true");
            }, 3000);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, []);

    const imgVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            transition: {
                duration: 0.5,
            },
            opacity: 1,
        },
    };

    return (
        <>
          {!allow ? 
    
            <div className= 'onLoad flexbox column center'>
              <motion.img 
              src={'images/logo.png'} alt="logo"
              variants={imgVariants}
              initial="hidden"
              animate="visible"
              />
            </div>
    
            :  <AppRoutes/>}
        </>
      );
    };

export default App;
