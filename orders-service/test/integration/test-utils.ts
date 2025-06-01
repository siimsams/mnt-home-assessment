import { DataSource } from 'typeorm';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { Order } from '../../src/orders/entities/order.entity';

export interface TestDatabaseConfig {
  container: StartedPostgreSqlContainer;
  dataSource: DataSource;
}

let globalTestConfig: TestDatabaseConfig | null = null;

export async function setupTestDatabase(): Promise<TestDatabaseConfig> {
  if (globalTestConfig) {
    return globalTestConfig;
  }

  const container = await new PostgreSqlContainer('postgres:17-bookworm')
    .withDatabase('orders_test')
    .withUsername('test')
    .withPassword('test')
    .start();

  const dataSource = new DataSource({
    type: 'postgres',
    host: container.getHost(),
    port: container.getMappedPort(5432),
    username: container.getUsername(),
    password: container.getPassword(),
    database: container.getDatabase(),
    entities: [Order],
    synchronize: true,
  });

  await dataSource.initialize();

  globalTestConfig = { container, dataSource };
  return globalTestConfig;
}

export async function teardownTestDatabase(
  config: TestDatabaseConfig,
): Promise<void> {
  if (config === globalTestConfig) {
    await config.dataSource?.destroy();
    await config.container?.stop();
    globalTestConfig = null;
  }
}

export async function cleanupTestDatabase(): Promise<void> {
  if (globalTestConfig) {
    await globalTestConfig.dataSource.getRepository(Order).clear();
  }
}

export async function globalTeardown(): Promise<void> {
  if (globalTestConfig) {
    await teardownTestDatabase(globalTestConfig);
  }
}
