import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";

import { Order, Product, User } from ".";
@Entity("cart")
export default class Cart {
  @PrimaryGeneratedColumn("uuid")
  id!: number;
  @CreateDateColumn()
  createdOn!: Date;

  @OneToOne((type) => User, { eager: true })
  @JoinColumn()
  user: User;

  @ManyToMany((type) => Product, { eager: true })
  @JoinTable()
  products: Product[];

  @ManyToOne((type) => Order, (cart_) => Cart, { eager: true })
  order: Order;
}
