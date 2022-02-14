import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("products")
export default class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column()
  category!: string;

  @Column()
  price!: number;

  @CreateDateColumn()
  addedOn!: Date;

  @UpdateDateColumn()
  updatedOn!: Date;
}
