import app from "./src/app.js";
import { connectToDB } from "./src/configs/database.js";

connectToDB();
const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server on ${PORT}`);
});