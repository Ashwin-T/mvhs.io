import * as aboutData from '../../data/About.json';
import BarcodeUtility from '../../components/barcode/Barcode';
import './utilities.css';

const About = () => {
    return (
        <>
            <div className="utilities-container">
                <div className='main-resources-container' style={{ marginLeft: 2 + "rem" }}>
                    <h1 className='main-resources'>Utilities</h1>
                    <div className='right-triangle-title'></div>
                </div>
                <BarcodeUtility />
                <div className = 'bottom-margin' />
            </div>
        </> 
    );
}
 
export default About;