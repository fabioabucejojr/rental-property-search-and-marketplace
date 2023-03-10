import axios from "axios";

const DeletePropertyListing = ({ prop_Id, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/property/${prop_Id}`);
      onDelete();
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};
