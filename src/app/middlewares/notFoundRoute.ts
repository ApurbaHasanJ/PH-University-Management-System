/* eslint-disable @typescript-eslint/no-unused-vars */

import express, { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const notFoundRoute = (req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API Not Found!!',
    error: 'API Error',
  });
};

export default notFoundRoute
