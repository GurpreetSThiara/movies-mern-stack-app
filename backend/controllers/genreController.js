import asyncHandler from "../middlewares/asyncHandler.js";
import Genre from "../model/Genre.js";




const createGenre = asyncHandler(async (req , res) => {
    console.log('create genre called') 
       try{
        const {name} = req.body;
        if(!name){
            return res.json({"error":"Name is required"});
        }
        console.log('create genre called') 


        const existingGenre = await Genre.findOne({ name });
         
        if(existingGenre){
            return res.json({"error":"Genre already exist"})
        }

        const genre = await new Genre({name}).save();
        res.json(genre);
    }catch(e){
        console.log(e)
        return res.status(400).json(error)
    }
});


const updateGenre = asyncHandler(async (req,res) =>{
    try{
        const {name} = req.body;
        const {id} = req.params;
        if(!name){
            return res.json({"error":"Name is required"})
        }

        const existingGenre = await Genre.findOne({_id:id});
        if(!existingGenre){
            return res.json({"error":"Genre doesn't exist"})
        }

        existingGenre.name = name;
        const updatedGenre = await existingGenre.save();
        res.json(updatedGenre);

    }catch(e){
        console.error(e);
        res.status(500).json({"error":"Internal server error"})
    }
});

const removeGenre = asyncHandler(async (req , res) => {
    console.log('remove called')
    try{
        console.log('remove called')

        const {id} = req.params;
        console.log(id)
        console.log("id               id")
        const genre = await Genre.findByIdAndDelete(id);
        if(!genre){
            return res.status(404).json({"error":"Genre doesn't exist"})
        }

        res.json(genre);
        

    }catch(e){
        console.error(e);
        res.status(500).json({'error':"Internal server error"})
    }
})

const listGenres = asyncHandler(async(req,res)=>{
    try{
        const allgenres = await Genre.find({}).lean();
      
        res.json(allgenres);

    }catch(e){
        console.error(e);

    }
});

const readGenre = asyncHandler(async(req , res)=> {
    try{
        const {id} = req.params;
        const genre = Genre.findOne({_id:id});
        if(!genre){
            return res.status(404).json({"error":"Genre not found"});
        }

        return res.json(genre)
    }catch(e){
        console.error(e);
        return res.status(500).json({"error":"Internal server error"})
    }
})

export {
    createGenre,
    removeGenre,
    updateGenre,
    listGenres,
    readGenre
}