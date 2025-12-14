import { Middleware } from '@reduxjs/toolkit';

const loggerMock: Middleware = () => next => action => next(action);

export default jest.fn(() => loggerMock);
