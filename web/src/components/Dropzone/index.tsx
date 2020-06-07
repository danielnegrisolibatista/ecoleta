import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
// import { FiUpload } from 'react-icons/fi'

import './styles.css'

interface Props {
  // função que recebe File e não retorna nada (void)
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(acceptedFiles => {

    // [TODO] TODO BUG -> undefined
    const file = acceptedFiles[0];
    console.log(file);
    return;
    
    const fileUrl = URL.createObjectURL(file);

    setSelectedFileUrl(fileUrl);
    onFileUploaded(file);
  }, [onFileUploaded])

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: 'imagem/*'
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} />

      {
        selectedFileUrl
          ? <img src={selectedFileUrl} alt="Point thumbnail" />
          : (
              <p>Imagem do estabelecimento</p>
            )
      }
    </div>
  )
}

export default Dropzone;