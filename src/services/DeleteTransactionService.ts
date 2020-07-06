import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transactionsExists = await transactionsRepository.findOne({where: {id}});

    if (!transactionsExists){
      throw new AppError('Transaction not found.', 400);
    }

    await transactionsRepository.delete(id);
  }
}

export default DeleteTransactionService;
