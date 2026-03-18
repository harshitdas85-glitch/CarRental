import multer from "multer";
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']); 

const storage = multer.diskStorage({
    filename:function(req,file,callback){
        callback(null,file.originalname)

    }
})
const upload = multer({storage:storage})
export default upload