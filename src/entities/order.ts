import { PrimaryGeneratedColumn, Entity, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import Cart from "./cart";
import User from "./user";
@Entity("order")
export default class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn()
  orderDate!: Date;

  @ManyToOne((type) => User, (user) => user.id, { eager: true })
  user!: User;

  @OneToMany((type) => Cart, (order) => Order)
  cart_!: Cart[];
}
