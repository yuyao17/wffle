import { Photon } from '@prisma/photon';
import { Request, Response } from 'express';

const photon = new Photon();

export interface Context {
  photon: Photon;
  req: Request;
  res: Response;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createContext = (expressContext: any) => ({
  ...expressContext,
  photon,
});
