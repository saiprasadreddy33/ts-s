import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateUserProfile } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    avatar: "",
    username: "",
    email: "",
    role: "",
    title: ""
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        avatar: user.avatar || "",
        username: user.username || "",
        email: user.email || "",
        role: user.role || "",
        title: user.title || ""
      });
    }
  }, [user]);

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email is invalid.";
    if (!formData.role) newErrors.role = "Role is required.";
    return newErrors;
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setFormData({ ...formData, avatar: URL.createObjectURL(e.target.files[0]) });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const updatedData = new FormData();
    if (selectedFile) {
      updatedData.append('avatar', selectedFile);
    }
    updatedData.append('username', formData.username);
    updatedData.append('email', formData.email);
    updatedData.append('role', formData.role);
    updatedData.append('title', formData.title);

    try {
      const response = await axios.put('https://ts-cl.onrender.com/api/update-profile', updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch(updateUserProfile(response.data.user));
      navigate("/dashboard");
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 w-1/2">
        <img
          src={formData.avatar || "path/to/default/avatar.png"}
          alt="Avatar"
          className="w-24 h-24 rounded-full mb-4"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4"
        />
        {errors.avatar && <p className="text-red-500">{errors.avatar}</p>}
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Username"
          className="mb-2 p-2 border rounded"
        />
        {errors.username && <p className="text-red-500">{errors.username}</p>}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="mb-2 p-2 border rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          placeholder="Role"
          className="mb-2 p-2 border rounded"
        />
        {errors.role && <p className="text-red-500">{errors.role}</p>}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="mb-2 p-2 border rounded"
        />
        {errors.title && <p className="text-red-500">{errors.title}</p>}
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
