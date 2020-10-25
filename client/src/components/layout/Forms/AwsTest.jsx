
import React, { useState } from 'react';
import axios from 'axios';
import ImageUploader from 'react-images-upload';

const FileUpload = () => {

    const [file, setFile] = useState(null);
  
    const submitFile = async (e) => {
        console.log("hi")
        let uploadedPromises = file.map(image => {
            let data = new FormData();
            data.append('image', image, image.name);
            return axios.post('/api/aws', data);
        })

        const results = await axios.all(uploadedPromises)

        try {
            console.log(results)
        } catch(err) {
            console.log(err)
        }
    };


  
    return (
        <div className='test_container'>
        <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={(e)=> setFile(e)}
                imgExtension={['.jpg', '.gif', '.png']}
                maxFileSize={5242880}
                withPreview={true}
            />
            <img src="https://jwppizza.s3.amazonaws.com/Cheese.png" alt=''></img>
            <button onClick={submitFile}>Submit</button>
      </div>
    );
  };
  
  export default FileUpload;