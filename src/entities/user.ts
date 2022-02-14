import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  BeforeInsert,
  OneToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import Cart from "./cart";
import Order from "./order";
import * as bcrypt from "bcryptjs";
@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: false, unique: true })
  email!: string;

  @Column()
  password!: string;
  @BeforeInsert()
  hashPassowd() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  @Column()
  isAdm!: boolean;

  @Column()
  createdOn!: Date;
  @BeforeInsert()
  createdDate() {
    let date = new Date();
    this.createdOn = date;
  }

  @Column({ nullable: true })
  updatedOn!: Date;

  @OneToOne((type) => Cart)
  cart: Cart;
}
