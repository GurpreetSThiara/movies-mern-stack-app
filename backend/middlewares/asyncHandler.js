

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req,res ,next)).catch((e)=>{
        res.status(500).json({message:e.mesage})
    })
}

export default asyncHandler