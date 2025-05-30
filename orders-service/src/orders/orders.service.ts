import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { nanoid } from 'nanoid';
import { CreateOrderDto } from './dtos/create-order.dto';
import { GetOrdersFilterDto } from './dtos/get-orders-filter.dto';
import { PaginatedDto } from 'src/shared/dto/paginated.dto';

@Injectable()
export class OrdersService {
    private readonly orderRepository: Repository<Order>;

    constructor(
        private readonly dataSource: DataSource
    ) {
        this.orderRepository = this.dataSource.getRepository(Order);
    }
    
    async getOrders(filters: GetOrdersFilterDto): Promise<PaginatedDto<Order>> {
        const currentLimit = filters.limit || 100;
        const currentPage = filters.page || 0;
    
        const qb = this.orderRepository.createQueryBuilder('order');
    
        if (filters.countryCodes?.length) {
            qb.andWhere('order.country IN (:...countryCodes)', { countryCodes: filters.countryCodes });
        }
    
        if (filters.paymentDescription) {
            qb.andWhere('order.paymentDescription ILIKE :paymentDescription', {
                paymentDescription: `%${filters.paymentDescription}%`,
            });
        }
    
        qb.orderBy(`CASE WHEN order.country = 'EST' THEN 0 ELSE 1 END`, 'ASC')
          .addOrderBy('order.paymentDueDate', 'ASC')
          .skip(currentPage)
          .take(currentLimit);
    
        const [orders, totalCount] = await qb.getManyAndCount();
    
        const totalPages = Math.ceil(totalCount / currentLimit);
    
        return { data: orders, totalPages, page: currentPage, limit: currentLimit, totalItems: totalCount };
    }

    async orderNumberExists(orderNumber: string): Promise<boolean> {
        return await this.orderRepository.count({ where: { orderNumber } }) > 0;
    }

    async createOrder(orderDto: CreateOrderDto): Promise<Order> {
        const orderNumberExists = await this.orderNumberExists(orderDto.orderNumber);
        if (orderNumberExists) {
            throw new BadRequestException('Order number already exists');
        }

        const order = this.orderRepository.create({
            ...orderDto,
            publicId: nanoid() + orderDto.orderNumber.slice(0, 4)
        });
        
        return this.orderRepository.save(order);
    }
}
