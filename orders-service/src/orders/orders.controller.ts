import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/create-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService
    ) {
    }

    @Get()
    getOrders() {
        return 'Hello World';
    }

    @Post()
    async createOrder(@Body() order: CreateOrderDto) {
        return this.ordersService.createOrder(order);
    }
}
