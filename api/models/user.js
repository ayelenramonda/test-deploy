import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs'

const UserSchema = new Schema({
 	username: {type: String, required: true, unique: true},    
	password: {type: String, required: true},
	name: {type: String, required: true},
	phone: {type: String, required: true},
	address: {type: String, required: true},
	age: {type: String, required: true},
	avatar: {type: String, required: true},
	admin: {type: Boolean, default:false}
	
	
    
});

UserSchema.pre('save', async function (next) {
	const user = this;
	const hash = await bcrypt.hash(user.password, 10);  
	this.password = hash;
	next();
  });
  
  //Crearemos un metodo nuevo en nuestro modelo de Users para validar contraseña. 
  //Donde le pasaremos la contraseña normal y usando bcrypt vamos a compararla con la
  //que esta encriptada. Esto nos va a devolver true o false
  UserSchema.methods.isValidPassword = async function (password) {
	const user = this;
	const compare = await bcrypt.compare(password, this.password);
	return compare;
  };
  UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

  
  
  UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const UserModel = model('user',  UserSchema);