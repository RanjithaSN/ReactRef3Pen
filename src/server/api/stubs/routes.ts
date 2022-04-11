import { Router, Request, Response } from 'express';
import { calculateOrderQuote } from './models/calculateOrderQuote';
import { createPaymentInstrument } from './models/createPaymentInstrument';
import { createSubscriber } from './models/createSubscriber';
import { removeAddress } from './models/removeAddress';
import { retrieveAddresses } from './models/retrieveAddresses';
import { retrieveOfferingContext } from './models/retrieveOfferingContext';
import { retrievePaymentInstrument } from './models/retrievePaymentInstrument';
import { retrieveSubscriber } from './models/retrieveSubscriber';
import { retrieveWallet } from './models/retrieveWallet';
import { searchInventory } from './models/searchInventory';
import { submitOrder } from './models/submitOrder';
import { updateCreditClassification } from './models/updateCreditClassification';
import { updateShoppingCart } from './models/updateShoppingCart';

const stubsRoutes = Router();

stubsRoutes.get('/', (_, res) => {
  res.status(200).json({
    message: 'Stubs!'
  });
});

stubsRoutes.post(
  '/CalculateOrderQuote',
  async (_: Request, res: Response) => {
    res.status(200).json(calculateOrderQuote);
  }
);

stubsRoutes.post(
  '/CreatePaymentInstrument',
  async (_: Request, res: Response) => {
    res.status(200).json(createPaymentInstrument);
  }
);

stubsRoutes.post(
  '/CreateSubscriber',
  async (_: Request, res: Response) => {
    res.status(200).json(createSubscriber);
  }
);

stubsRoutes.post(
  '/RemoveAddress',
  async (_: Request, res: Response) => {
    res.status(200).json(removeAddress);
  }
);

stubsRoutes.post(
  '/RetrieveAddresses',
  async (_: Request, res: Response) => {
    res.status(200).json(retrieveAddresses);
  }
);

stubsRoutes.post(
  '/RetrieveOfferingContext',
  async (_: Request, res: Response) => {
    res.status(200).json(retrieveOfferingContext);
  }
);

stubsRoutes.post(
  '/RetrievePaymentInstrument',
  async (_: Request, res: Response) => {
    res.status(200).json(retrievePaymentInstrument);
  }
);

stubsRoutes.post(
  '/RetrieveSubscriber',
  async (_: Request, res: Response) => {
    res.status(200).json(retrieveSubscriber);
  }
);

stubsRoutes.post(
  '/RetrieveWallet',
  async (_: Request, res: Response) => {
    res.status(200).json(retrieveWallet);
  }
);

stubsRoutes.post(
  '/SearchInventory',
  async (_: Request, res: Response) => {
    res.status(200).json(searchInventory);
  }
);

stubsRoutes.post(
  '/SubmitOrder',
  async (_: Request, res: Response) => {
    res.status(200).json(submitOrder);
  }
);

stubsRoutes.post(
  '/UpdateCreditClassification',
  async (_: Request, res: Response) => {
    res.status(200).json(updateCreditClassification);
  }
);

stubsRoutes.post(
  '/UpdateShoppingCart',
  async (_: Request, res: Response) => {
    res.status(200).json(updateShoppingCart);
  }
);


export default stubsRoutes;
