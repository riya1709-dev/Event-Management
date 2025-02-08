import axiosInstance from "./axiosinstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();  // Fix: Correct syntax
    formData.append('image', imageFile);

    try {
        const response = await axiosInstance.post('/event/image-upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (err) {
        console.error('Upload error:', err);
        throw err;
    }
};

export default uploadImage;
