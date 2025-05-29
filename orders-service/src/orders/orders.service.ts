import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { nanoid } from 'nanoid';
import { CreateOrderDto } from './dtos/create-order.dto';

@Injectable()
export class OrdersService {
    private readonly orderRepository: Repository<Order>;

    constructor(
        private readonly dataSource: DataSource
    ) {
        this.orderRepository = this.dataSource.getRepository(Order);
    }

    async createOrder(orderDto: CreateOrderDto): Promise<Order> {
        const order = this.orderRepository.create({
            ...orderDto,
            publicId: nanoid() + orderDto.orderNumber.slice(0, 4)
        });
        
        return this.orderRepository.save(order);
    }
}
