import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { nanoid } from 'nanoid';
import { CreateOrderDto } from './dtos/create-order.dto';
import { GetOrdersFilterDto } from './dtos/get-orders-filter.dto';

@Injectable()
export class OrdersService {
    private readonly orderRepository: Repository<Order>;

    constructor(
        private readonly dataSource: DataSource
    ) {
        this.orderRepository = this.dataSource.getRepository(Order);
    }
    
    async getOrders(filters: GetOrdersFilterDto): Promise<Order[]> {
        const where: FindOptionsWhere<Order> = {};
        if (filters.country) where.country = filters.country;
        if (filters.paymentDescription) where.paymentDescription = filters.paymentDescription;
        return this.orderRepository.findBy(where);
    }

    async orderNumberExists(orderNumber: string): Promise<boolean> {
        return await this.orderRepository.count({ where: { orderNumber } }) > 0;
    }

    async createOrder(orderDto: CreateOrderDto): Promise<Order> {
        const order = this.orderRepository.create({
            ...orderDto,
            publicId: nanoid() + orderDto.orderNumber.slice(0, 4)
        });
        
        return this.orderRepository.save(order);
    }
}
