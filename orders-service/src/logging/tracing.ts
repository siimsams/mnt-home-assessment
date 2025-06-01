import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { TypeormInstrumentation } from '@opentelemetry/instrumentation-typeorm';
import * as process from 'process';

const TRACE_EXPORTER_URL = process.env.TRACE_EXPORTER_URL;

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: TRACE_EXPORTER_URL,
  }),
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new TypeormInstrumentation(),
  ],
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'orders-service',
  }),
});

sdk.start();

process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(() => console.log('SDK shut down'))
    .catch((err) => console.error('Error during shutdown', err))
    .finally(() => process.exit(0));
});
