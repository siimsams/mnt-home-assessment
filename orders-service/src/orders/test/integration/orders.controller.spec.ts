import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from '../../orders.controller';
import { OrdersService } from '../../orders.service';
import { DataSource } from 'typeorm';
import { CreateOrderDto } from '../../dtos/create-order.dto';
import { GetOrdersFilterDto } from '../../dtos/get-orders-filter.dto';
import { BadRequestException } from '@nestjs/common';
import {
  setupTestDatabase,
  cleanupTestDatabase,
  TestDatabaseConfig,
  teardownTestDatabase,
} from '../../../../test/integration/test-utils';

jest.setTimeout(30000);

describe('OrdersController Integration Tests', () => {
  let controller: OrdersController;
  let testConfig: TestDatabaseConfig;

  beforeAll(async () => {
    testConfig = await setupTestDatabase();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        OrdersService,
        {
          provide: DataSource,
          useValue: testConfig.dataSource,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  }, 30000);

  beforeEach(async () => {
    await cleanupTestDatabase();
  });

  afterAll(async () => {
    await teardownTestDatabase(testConfig);
  });

  describe('createOrder', () => {
    it('should create a new order', async () => {
      const createOrderDto: CreateOrderDto = {
        orderNumber: 'TEST-001',
        paymentDescription: 'Test Payment',
        streetAddress: '123 Test St',
        town: 'Test Town',
        country: 'EST',
        amount: 100,
        currency: 'EUR',
        paymentDueDate: new Date('2024-12-31'),
      };

      const result = await controller.createOrder(createOrderDto);

      expect(result).toBeDefined();
      expect(result.orderNumber).toBe(createOrderDto.orderNumber);
      expect(result.publicId).toBeDefined();
      expect(result.publicId.length).toBeGreaterThan(4);
    });

    it('should throw BadRequestException when order number already exists', async () => {
      const createOrderDto: CreateOrderDto = {
        orderNumber: 'TEST-002',
        paymentDescription: 'Test Payment',
        streetAddress: '123 Test St',
        town: 'Test Town',
        country: 'EST',
        amount: 100,
        currency: 'EUR',
        paymentDueDate: new Date('2024-12-31'),
      };

      await controller.createOrder(createOrderDto);

      await expect(controller.createOrder(createOrderDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getOrders', () => {
    beforeEach(async () => {
      const orders = [
        {
          orderNumber: 'TEST-003',
          paymentDescription: 'Test Payment 1',
          streetAddress: '123 Test St',
          town: 'Test Town',
          country: 'EST',
          amount: 100,
          currency: 'EUR',
          paymentDueDate: new Date('2024-12-31'),
        },
        {
          orderNumber: 'TEST-004',
          paymentDescription: 'Test Payment 2',
          streetAddress: '456 Test St',
          town: 'Test Town',
          country: 'LVA',
          amount: 200,
          currency: 'EUR',
          paymentDueDate: new Date('2024-12-30'),
        },
      ];

      for (const order of orders) {
        await controller.createOrder(order as CreateOrderDto);
      }
    });

    it('should get all orders with default pagination', async () => {
      const result = await controller.get({} as GetOrdersFilterDto);

      expect(result.data).toHaveLength(2);
      expect(result.totalItems).toBe(2);
      expect(result.page).toBe(0);
      expect(result.limit).toBe(100);
    });

    it('should filter orders by country code', async () => {
      const filters: GetOrdersFilterDto = {
        countryCodes: ['EST'],
      };

      const result = await controller.get(filters);

      expect(result.data).toHaveLength(1);
      expect(result.data[0].country).toBe('EST');
    });

    it('should filter orders by payment description', async () => {
      const filters: GetOrdersFilterDto = {
        paymentDescription: 'Payment 1',
      };

      const result = await controller.get(filters);

      expect(result.data).toHaveLength(1);
      expect(result.data[0].paymentDescription).toBe('Test Payment 1');
    });
  });

  describe('orderNumberExists', () => {
    it('should return true when order number exists', async () => {
      const createOrderDto: CreateOrderDto = {
        orderNumber: 'TEST-005',
        paymentDescription: 'Test Payment',
        streetAddress: '123 Test St',
        town: 'Test Town',
        country: 'EST',
        amount: 100,
        currency: 'EUR',
        paymentDueDate: new Date('2024-12-31'),
      };

      await controller.createOrder(createOrderDto);
      const result = await controller.exists('TEST-005');

      expect(result).toEqual({ exists: true });
    });

    it('should return false when order number does not exist', async () => {
      const result = await controller.exists('NON-EXISTENT');

      expect(result).toEqual({ exists: false });
    });
  });
});
