import AppError from '../errors/AppError';

import { getRepository, getCustomRepository } from 'typeorm';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  categoryTitle: string;
}

interface Response {
  id: string;
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class CreateTransactionService {
  public async execute({title, value, type, categoryTitle}: Request): Promise<Response> {
    if (type != 'income' && type != 'outcome'){
      throw new AppError('Invalid type', 400);
    }

    const transactionRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);
    const categoryExists = await categoryRepository.findOne({ where: { title: categoryTitle } });

    let category;

    if (!categoryExists) {
      const newCategory = categoryRepository.create({ title: categoryTitle });
      await categoryRepository.save(newCategory);
      category = newCategory;
    }else{
      category = categoryExists;
    }

    const balance = await transactionRepository.getBalance();

    if (type == 'outcome' && balance.total < value) {
      throw new AppError('You do not have enough balance.', 400);
    }

    const transaction = transactionRepository.create({
      title, type, value, category_id: category.id, category
    });

    await transactionRepository.save(transaction);
    return {
      id: transaction.id,
      title: transaction.title,
      type: transaction.type,
      value: transaction.value,
      category: category.title,
    };
  }
}

export default CreateTransactionService;
