
import bcrypt from 'bcrypt'; 


interface IUser{

	username: string; 

	password: string; 

	name: string; 

	email: string;

	userType: 'administrator' | 'default' ;

	encryptPassword(password: string): void;

	confirmPassword(string): Promise<boolean>
}

export class User implements IUser {
	
	constructor(user:IUser){
		this.username = user.username; 
		this.encryptPassword(user.password); 
		this.email = user.email; 
		this.userType = 'default'; 
	}

	username: string; 

	password: string; 

	name: string; 

	email: string;

	userType: 'administrator' | 'default' = 'default';

	encryptPassword(password: string): void {
		this.password = bcrypt.hashSync(password, 10);
	}

	async confirmPassword(password: string): Promise<boolean>{
		return bcrypt.compare(password, this.password)
	}

}