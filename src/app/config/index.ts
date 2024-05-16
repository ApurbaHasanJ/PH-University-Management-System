import dontenv from 'dotenv';
import path from 'path';


dontenv.config({path: path.join(process.cwd(), '.env')})