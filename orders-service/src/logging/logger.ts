import {trace, context } from '@opentelemetry/api';
import pino from 'pino';

const baseLogger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

export function loggerWithTrace() {
  const activeSpan = trace.getSpan(context.active());
  const traceId = activeSpan?.spanContext().traceId;
  return baseLogger.child({ traceId });
}