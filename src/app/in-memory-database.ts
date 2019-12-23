import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from '../app/pages/categories/shared/category.model';
export class InMemoryDatabase implements InMemoryDbService {

    createDb() {
        const categories: Category[] = [
            { id: 1, name: "Lazer", description: "Passear" },
            { id: 2, name: "Saúde", description: "Unimed" },
            { id: 3, name: "Salário", description: "Dinheiro" },
        ];
        return { categories }
    }
}