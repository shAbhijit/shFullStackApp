import { HttpStatus, RequestMethod, ValidationPipe } from '@nestjs/common'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino'

export function setupApp(app: NestFastifyApplication) {
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix, { exclude: [{ path: 'health', method: RequestMethod.GET }] })
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      whitelist: true,
      enableDebugMessages: true,
    })
  )
  app.enableShutdownHooks()
  app.useLogger(app.get(Logger))
  app.useGlobalInterceptors(new LoggerErrorInterceptor())
}
