import Barcode from 'react-barcode';
import {Link} from 'react-router-dom';
import './barcode.css';
const BarcodeUtility = () => {

    const {id} = localStorage.getItem('mvhsio-user') ? JSON.parse(localStorage.getItem('mvhsio-user')) : {id: '', name: '', periods: []};

    return (
        <>
            <div className="barcode-container flexbox column center">
            {
                (id !== '' )? <Barcode width = {'3'} value = {id} /> : <h2>Update Your <Link to = '/settings'>Settings</Link> to acess this feature</h2>
            }
            </div>
        </>
      );
}
 
export default BarcodeUtility;