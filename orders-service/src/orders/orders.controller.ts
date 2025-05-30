import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { Order } from './entities/order.entity';
import { GetOrdersFilterDto } from './dtos/get-orders-filter.dto';

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService
    ) {
    }

    @Get()
    async get(@Query() filters: GetOrdersFilterDto) {
        return this.ordersService.getOrders(filters);
    }

    @Get('exists')
    async exists(@Query('orderNumber') orderNumber: string) {
        const exists = await this.ordersService.orderNumberExists(orderNumber);
        return { exists };
    }

    @Post()
    async createOrder(@Body() order: CreateOrderDto): Promise<Order> {
        return this.ordersService.createOrder(order);
    }
}
