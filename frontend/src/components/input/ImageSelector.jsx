import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FaRegFileImage } from 'react-icons/fa6';
import { MdDeleteOutline } from 'react-icons/md';

const ImageSelector = ({ image, setImage ,handleDeleteImg}) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    const handleRemoveImage=()=>{
        setImage(null);
        handleDeleteImg()
    }
    useEffect(() => {
        if (typeof image === 'string') {
            setPreviewUrl(image);
        } else if (image) {
            setPreviewUrl(URL.createObjectURL(image));
        } else {
            setPreviewUrl(null);
        }

        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [image]);

    return (
        <div>
            {/* Hidden File Input */}
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            {/* Image Preview */}
            {!previewUrl ? (
                <button
                    className="w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50"
                    onClick={onChooseFile}
                >
                    <div className="w-14 h-14 flex items-center justify-center bg-cyan-50 rounded-full border border-cyan-100">
                        <FaRegFileImage className="text-xl text-cyan-500" />
                    </div>
                    <p className="text-sm text-slate-500">Browse image files to upload</p>
                </button>
            ) : (
                <div className="w-full relative">
                    <img
                        src={previewUrl}
                        alt="Selected Preview"
                        className="w-full h-[300px] object-cover rounded-lg"
                    />
                    <button className='btn-small btn-delete absolute top-2 riht-2'
                    onClick={handleRemoveImage}>
                        <MdDeleteOutline className='text-lg'/>
                    </button>
                </div>
            )}
        </div>
    );
};

ImageSelector.propTypes = {
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(File)]), // Supports URL or File
    setImage: PropTypes.func.isRequired,
    handleDeleteImg: PropTypes.func, 
};

export default ImageSelector;
