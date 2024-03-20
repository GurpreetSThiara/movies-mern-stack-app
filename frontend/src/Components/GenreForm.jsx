const GenreForm = ({
    value,
    setValue,
    handleSubmit,
    buttonText = "Submit",
    handleDelete,
    id
  }) => {
    const token = localStorage.getItem('userInfo')
    return (
      <div className="py-4 w-full flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit} className="space-y-3 w-full">
          <input
            type="text"
            className="py-3 px-1 border rounded-lg w-full"
            placeholder="Write genre name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
  
          <div className="flex justify-between">
            <button className="bg-[#00313d] text-white py-2 px-4 rounded-lg hover:bg-[#002244] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50">
              {buttonText}
            </button>
  
            {handleDelete && (
              <button
                onClick={()=>{
                  handleDelete({id:id,data:{token}})
                }}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    );
  };
  
  export default GenreForm;