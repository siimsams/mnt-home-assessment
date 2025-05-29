import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  publicId: string;

  @Column({ unique: true })
  orderNumber: string;

  @Column()
  paymentDescription: string;

  @Column()
  streetAddress: string;

  @Column()
  town: string;

  @Column()
  country: string;

  @Column('decimal')
  amount: number;

  @Column()
  currency: string;

  @Column('timestamptz')
  paymentDueDate: Date;
}
