import { Injectable } from '@nestjs/common';
import { User } from 'entities/User';


@Injectable()
export class AppService {
  authed: Array<User> = [];
  users: Array<User> = [];
  tryRegister(r_user: User){
    if (this.users.find(user => user.nickname == r_user.nickname)){
      return "Already registered!";
    } else {
      this.users.push(r_user);
      return "Succesfully registered!";
    }
  }
  tryAuth(a_user: User){
    if (this.users.find(user => user.nickname == a_user.nickname && user.password == a_user.password)){
      if (this.authed.find(user => user.nickname == a_user.nickname)){
        return "Already authentificated!";
      } else {
        this.authed.push(a_user);
        return "Succesfully authentificated!";
      }
    } else {
      return "Password or login is invalid!";
    }
  }
}
