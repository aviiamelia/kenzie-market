import { User } from "../entities";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async findById(id: string): Promise<User | undefined> {
    const user = await this.findById(id);
    return user;
  }
  public async list(): Promise<User[]> {
    const users = await this.find();
    return users;
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({ where: { email } });
    return user;
  }
}

export default UserRepository;
