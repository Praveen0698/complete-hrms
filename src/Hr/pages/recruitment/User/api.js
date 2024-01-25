import axios from 'axios';

export const saveUser = async (formData) => {
    try{
        await axios.post(
            "http://localhost:8089/users/create/user",
            formData
          );
    } catch(error) {
        console.error("saveUser",error)
    }
}

export const deleteUser = async (id) => {
    try{
        await axios.delete(`http://localhost:8089/users/delete/${id}`)
    } catch(error) {
        console.error("Error deleting User",error)
    }
};

export const loadUser = async () => {
    try {
       const result =  await axios.get(
            "http://localhost:8089/user/get/user",
            {
              validateStatus: () => {
                return true;
              },
            }
        
          );
          return result.data
    } catch (error) {
        console.error("Error load user", error)
    }
}