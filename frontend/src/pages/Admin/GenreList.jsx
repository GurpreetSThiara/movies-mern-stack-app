import { useState } from "react";
import {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useGetAllGenresQuery,
} from "../../redux/api/genre";

import { toast } from "react-toastify";
import GenreForm from "../../Components/GenreForm";
import Modal from "../../Components/Modal";


const GenreList = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const token = userInfo?.jwt
  console.log("jwt")
  console.log(userInfo)
  const { data: genres, refetch } = useGetAllGenresQuery();
  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await createGenre({ name ,token }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating genre failed, try again.");
    }
  };

  const handleUpdateGenre = async (e) => {
    e.preventDefault();

    if (!updateGenre) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        data: {
          name: updatingName,
          token
        },
        
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        refetch();
        setSelectedGenre(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGenre = async () => {
    try {
      const result = await deleteGenre({id:selectedGenre._id,data:token}).unwrap();

      if (result.error) {
        console.error(result)
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        refetch();
        setSelectedGenre(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Genre deletion failed. Tray again.");
    }
  };

  return (
    <div>

      
 <div>
 <nav className=" flex items-center relative w-full bg-[#000]   h-20 z-40 p-4">
  <div className="text-4xl md:text-2xl lg:text-3xl">
    <h2>VMovies</h2>
  </div>
</nav>
 </div>
 <div className="flex flex-wrap p-4 z-501">
          {genres?.map((genre , index) => 
            <div key={index} >
              <div
              style={{cursor:'pointer'}}
                className="cursor-pointer bg-[#00313d] border border-teal-500 text-teal-500 py-2 px-4 rounded-lg m-3 hover:from-teal-400 hover:to-#001133 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                onClick={() => {
                  console.log('ccccccccccccccccccccccccccccccccccccccccccccccccccccc')
                
                    setModalVisible(true);
                    setSelectedGenre(genre);
                    setUpdatingName(genre.name);
              
                }}
              >
                {genre.name}
              </div>
            </div>
          )}
        </div>
 <div className="w-full fixed bg-no-repeat   z-1 h-full opacity-20  bg-[#000]" style={{backgroundColor:"#002244",color:"#002244",background:"url(https://img.freepik.com/free-photo/cinema-still-life_23-2148017216.jpg?t=st=1710872634~exp=1710876234~hmac=122ddaed851e0361ad2e185c298cbdd3c490b686c67aee46dd253d7fa10c9aa7&w=996)"}}>
 </div>
<div>

</div>
    
    <div className="relative flex flex-col md:flex-row z-50 bg-opacity-100 rounded-b-lg m-2 ">
      <div className="w-full md:w-3/4 p-4 z-100 " >
      <h1 className="text-4xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl">Manage Genres</h1>
        <div className="flex items-center justify-center w-full">
        <GenreForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateGenre}
          buttonText="Add new genre"
        />
    
   
        </div>

        <br />


        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <GenreForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateGenre}
            buttonText="Update"
            handleDelete={handleDeleteGenre}
            id={selectedGenre?.id}
          />
        </Modal>
      </div>
      </div>
      
    
     

     
    </div>
  );
};

export default GenreList;