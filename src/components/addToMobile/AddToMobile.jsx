
import {MdOutlineIosShare} from 'react-icons/md';
import {BsThreeDotsVertical} from 'react-icons/bs';
import {motion} from 'framer-motion';
import './addToMobile.css';

const AddToMobile = ({hasAdded, setHasAdded}) => {

    const userAgent = window.navigator.userAgent
    const isAndroid = userAgent.indexOf('Android') > -1;
    const isIOS = userAgent.indexOf('iPhone') > -1;

    const handleAllowClick = () => {
        setHasAdded(false);
    }

    const variants = {
        initial : {
            y: '200vh',
        },
        final: {
            y: '0',
            transition:{ 
                ease: 'easeIn',
                duration: 1,
                delay: 0,
            }
        },
    }

    const variants2 = {
        initial : {
            opacity: 0,
        },
        final: {
            opacity: 1,
            transition:{
                ease: 'easeIn',
                duration: 1,
                delay: 1,
            }
        }
    }

    
    return ( 
        <>
            <div style = {{width: '100%'}} className="flexbox column center">

                {(window.innerWidth <= 786 && hasAdded) ? 
                
                <>         

                    <motion.div className="grey-opaque"
                        variants={variants2}
                        initial="initial"
                        animate="final"
                        exit="initial"
                    />
                
                    <motion.div className="add-to-mobile flexbox center"
                        variants={variants}
                        initial="initial"
                        animate="final"
                        exit="initial"
                    >                
                        <div className='flexbox column center'>
                            <img src = 'images/logoNav.png' alt = 'mobile logo'/>
                            
                            <h3>It looks like you are using this web app in a browser</h3>
                            <p>Spartan Assistant works best when installed as a PWA</p>

                            <p>
                                To add Spartan Assistant to the home screen tap
                            </p>

                            {
                                isIOS && 
                                <MdOutlineIosShare style = {{color: 'dodgerblue', margin: '0'}} size = {35}/>

                            }
                            {
                                isAndroid &&
                                <BsThreeDotsVertical size = {25}/>
                            }
                            
                            <br />

                            <p>
                                and then press <span style = {{fontWeight: 'bold'}}>Add to Home Screen</span>
                            </p>

                            <br />

                            <span style = {{color: 'grey', width: '90%'}}>Not Interested? <span style = {{fontWeight: 'bold'}} onClick = {handleAllowClick}>Dismiss</span></span>
                        </div>
                    </motion.div >
                </>
                : 
                    <>

                    </>
                }
            </div>
        </> 
    );
}
 
export default AddToMobile;